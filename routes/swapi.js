const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cache } = require('../models/caching');
const get_all_results = require('../helper functions/get_all_result_pages');

router.get(['/:endpoint','/:endpoint/:id'], async (req, res) => {

    let response;
    let { page, size } = req.query;
    let {endpoint, id} = req.params;
    let existingCache = await cache.findOne({ endpoint: endpoint });

    id = parseInt(id);
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: endpoint });
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
            response = await axios.get(`https://swapi.py4e.com/api/${endpoint}/${id}`);
        }
        else {
            const {payload} = await get_all_results(endpoint);
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

module.exports = router;