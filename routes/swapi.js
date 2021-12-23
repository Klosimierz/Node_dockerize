const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cache } = require('../models/caching');

router.get(['/:endpoint','/:endpoint/:id'], async (req, res) => {

    let response;
    let resultsArray;
    let { page, size } = req.query;
    let {endpoint, id} = req.params;
    let existingCache = await cache.findOne({ endpoint: req.params.endpoint });

    id = parseInt(id);
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: req.params.endpoint });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(id)) {
            response = existingCache.payload[(id) - 1];
            res.status(200).send(response);
            return;
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.status(200).send(response);
            return;
        }
    }

    {
        console.log('Uncached data');
        if (Number.isInteger(id)) {
            response = await axios.get(`https://swapi.py4e.com/api/${req.params.endpoint}/${id}`);
        }
        else {
            response = await axios.get(`https://swapi.py4e.com/api/${req.params.endpoint}`);
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: req.params.endpoint,
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

module.exports = router;