const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cache } = require('../models/caching');

router.get('/films', async (req, res) => {

    //Variables -start
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "films" });
    page ? parseInt(page) : 1;
    size ? parseInt(size) : 1;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "films" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
            res.send(response);
            return;
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.send(response);
            return;
        }
    }

    {
        console.log('UNCACHED');
        if (Number.isInteger(req.query.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/films/${req.query.id}`);
        }
        else {
            response = await axios.get("https://swapi.py4e.com/api/films");
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: "films",
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/species', async (req, res) => {
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "species" });
    let cacheIsOutdated = false;
    //check if cache isn't outdated
    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        cacheIsOutdated = true;
        await cache.findOneAndDelete({ endpoint: "species" });
    }
    //end
    page = 1;
    size = 10;
    //FOR CACHED ASSETS
    if (existingCache?.payload && !cacheIsOutdated) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
            res.send(response);
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.send(response);
        }
    }
    //FOR CACHED ASSETS --END
    //FOR UNCACHED ASSETS
    else {
        console.log('UNCACHED');
        if (Number.isInteger(req.body.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/species/${req.body.id}`);
        }
        else {
            response = await axios.get("https://swapi.py4e.com/api/species");
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: "species",
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.send(payload.slice((page - 1) * size, page * size));
        }
    }
    //FOR UNCACHED ASSETS --END
});

router.get('/vehicles', async (req, res) => {
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "vehicles" });
    let cacheIsOutdated = false;
    //check if cache isn't outdated
    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        cacheIsOutdated = true;
        await cache.findOneAndDelete({ endpoint: "vehicles" });
    }
    //end
    page = 1;
    size = 10;
    //FOR CACHED ASSETS
    if (existingCache?.payload && !cacheIsOutdated) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
            res.send(response);
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.send(response);
        }
    }
    //FOR CACHED ASSETS --END
    //FOR UNCACHED ASSETS
    else {
        console.log('UNCACHED');
        if (Number.isInteger(req.body.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/vehicles/${req.body.id}`);
        }
        else {
            response = await axios.get("https://swapi.py4e.com/api/vehicles");
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: "vehicles",
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.send(payload.slice((page - 1) * size, page * size));
        }
    }
    //FOR UNCACHED ASSETS --END
});

router.get('/people', async (req, res) => {
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "people" });
    let cacheIsOutdated = false;
    //check if cache isn't outdated
    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        cacheIsOutdated = true;
        await cache.findOneAndDelete({ endpoint: "people" });
    }
    //end
    page = 1;
    size = 10;
    //FOR CACHED ASSETS
    if (existingCache?.payload && !cacheIsOutdated) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
            res.send(response);
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.send(response);
        }
    }
    //FOR CACHED ASSETS --END
    //FOR UNCACHED ASSETS
    else {
        console.log('UNCACHED');
        if (Number.isInteger(req.body.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/people/${req.body.id}`);
        }
        else {
            response = await axios.get("https://swapi.py4e.com/api/people");
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: "people",
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.send(payload.slice((page - 1) * size, page * size));
        }
    }
    //FOR UNCACHED ASSETS --END
});

router.get('/starships', async (req, res) => {
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "starships" });
    let cacheIsOutdated = false;
    //check if cache isn't outdated
    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        cacheIsOutdated = true;
        await cache.findOneAndDelete({ endpoint: "starships" });
    }
    //end
    page = 1;
    size = 10;
    //FOR CACHED ASSETS
    if (existingCache?.payload && !cacheIsOutdated) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
            res.send(response);
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.send(response);
        }
    }
    //FOR CACHED ASSETS --END
    //FOR UNCACHED ASSETS
    else {
        console.log('UNCACHED');
        if (Number.isInteger(req.body.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/starships/${req.body.id}`);
        }
        else {
            response = await axios.get("https://swapi.py4e.com/api/starships");
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: "starships",
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.send(payload.slice((page - 1) * size, page * size));
        }
    }
    //FOR UNCACHED ASSETS --END
});

router.get('/planets', async (req, res) => {
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "planets" });
    let cacheIsOutdated = false;
    page ? parseInt(page) : 1;
    size ? parseInt(size) : 1;
    //check if cache isn't outdated
    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        cacheIsOutdated = true;
        await cache.findOneAndDelete({ endpoint: "planets" });
    }
    //end
    //FOR CACHED ASSETS
    if (existingCache?.payload && !cacheIsOutdated) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
            res.send(response);
        }
        else {
            response = existingCache.payload.slice((page - 1) * size, page * size);
            res.send(response);
        }
    }
    //FOR CACHED ASSETS --END
    //FOR UNCACHED ASSETS
    else {
        console.log('UNCACHED');
        if (Number.isInteger(req.body.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/planets/${req.body.id}`);
        }
        else {
            response = await axios.get("https://swapi.py4e.com/api/planets");
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: "planets",
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const { payload } = await addCache.save();
            res.send(payload.slice((page - 1) * size, page * size));
        }
    }
    //FOR UNCACHED ASSETS --END
});

router.get('/wordpairs/:id', async (req, res) => {
    const { data } = await axios.get(`https://swapi.py4e.com/api/films/${req.params.id}`);
    let text = ((data.opening_crawl).replace(/[\r\n.,]/g, ' ')).replace(/\s{2,}/g, " ");
    let wordArray = text.split(" ").filter((e) => { return e != '' });

    let dictionary = new Object();

    wordArray.forEach(word => {
        if (Object.keys(dictionary).length === 0) {
            Object.assign(dictionary,{[word.toLowerCase()] : 0});
        }
        for(let key of Object.keys(dictionary)) {
            if(key === word) {
                dictionary[key] ++;
                break;
            }
            else {
                Object.assign(dictionary,{[word.toLowerCase()] : 1});
            }
        }
        res.status(200).send(dictionary);
    });

});

router.get('/common_name', async (req, res) => {

});

module.exports = router;