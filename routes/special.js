const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cache } = require('../models/caching');
const count_substr = require('../helper functions/count_substr');

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

    let output = {};

    names.forEach(name => {
        Object.assign(output,{[name] : count_substr(fullCrawls,name)});
    })

    let sorted = (Object.entries(output)).sort((name,occurences)=>occurences[1]-name[1]);
    res.status(200).send(sorted[0]);
});

module.exports = router;