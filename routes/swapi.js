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
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "films" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
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
        console.log('UNCACHED');
        if (Number.isInteger(req.body.id)) {
            response = await axios.get(`https://swapi.py4e.com/api/films/${req.body.id}`);
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
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/species', async (req, res) => {
    //Variables -start
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "species" });
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "species" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
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
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/vehicles', async (req, res) => {
    //Variables -start
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "vehicles" });
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "vehicles" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
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
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/people', async (req, res) => {
    //Variables -start
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "people" });
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "people" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
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
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/starships', async (req, res) => {
    //Variables -start
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "starships" });
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "starships" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
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
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/planets', async (req, res) => {
    //Variables -start
    let response;
    let resultsArray;
    let { page, size } = req.query;
    let existingCache = await cache.findOne({ endpoint: "planets" });
    page ? parseInt(page) : page = 1;
    size ? parseInt(size) : size = 10;
    //Variables -end

    if (existingCache?.expiryDate < Date.now()) {
        console.log('Old data, deleting');
        await cache.findOneAndDelete({ endpoint: "planets" });
    }

    else if (existingCache?.payload) {
        if (Number.isInteger(req.body.id)) {
            response = existingCache.payload[(req.body.id) - 1];
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
            res.status(200).send(payload.slice((page - 1) * size, page * size));
        }
    }
});

router.get('/wordpairs', async (req, res) => {
    const { data } = await axios.get(`https://swapi.py4e.com/api/films`);
    let coalesced_crawl = '';
    (data.results).forEach(result => {
        coalesced_crawl+=(' ',result.opening_crawl);
    })
    let text = ((coalesced_crawl).replace(/[\r\n.,]/g, ' ')).replace(/\s{2,}/g, " ");
    let wordArray = text.split(" ").filter((e) => { return e != '' });

    let dictionary = new Object();

    for(let x = 0; x < wordArray.length; x++) {
        if (dictionary[wordArray[x]] === undefined) {
            dictionary[wordArray[x]] = 1;
        }
        else {
            dictionary[wordArray[x]] ++;
        }
    }
    res.status(200).send(dictionary);
});

router.get('/common_name', async (req, res) => {
    let existingCachePpl = await cache.findOne({ endpoint: "people" });
    let existingCacheMvs = await cache.findOne({ endpoint: "films"});
    const names = (existingCachePpl.payload).map(obj => obj.name);
    const crawls = (existingCacheMvs.payload).map(obj => obj.opening_crawl);
    const fullCrawls = ((crawls.join(' ')).replace(/[\r\n.,]/g, ' ')).replace(/\s{2,}/g, " ");
    const count_substr = (str, searchValue) => {
        let count = 0,
          i = 0;
        while (true) {
          const r = str.indexOf(searchValue, i);
          if (r !== -1) [count, i] = [count + 1, r + 1];
          else return count;
        }
      }; 

    let output = {};

    names.forEach(name => {
        Object.assign(output,{[name] : count_substr(fullCrawls,name)});
    })

    let sorted = (Object.entries(output)).sort((name,occurences)=>occurences[1]-name[1]);
    res.status(200).send(sorted[0]);
});

module.exports = router;