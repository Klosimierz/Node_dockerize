const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cache } = require('../models/caching');
const count_substr = require('../helper functions/count_substr');
const pair_words = require('../helper functions/pair_words');
const get_all_results = require('../helper functions/get_all_result_pages');

router.get('/wordpairs', async (req, res) => {
    let existingCacheMvs = await cache.findOne({ endpoint: "films"});
    if (!existingCacheMvs) {
        existingCacheMvs = await get_all_results("films");
    }
    let data = existingCacheMvs;
    let coalesced_crawl = '';
    (data.payload).forEach(result => {
        coalesced_crawl+=(' ',result.opening_crawl);
    })
    let text = ((coalesced_crawl).replace(/[\r\n.,]/g, ' ')).replace(/\s{2,}/g, " ");
    let wordArray = text.split(" ").filter((e) => { return e != '' });
    
    let result = pair_words(wordArray);

    res.status(200).send(result);
});

router.get('/common_name', async (req, res) => {
    let existingCachePpl = await cache.findOne({ endpoint: "people" });
    let existingCacheMvs = await cache.findOne({ endpoint: "films"});

    if(!existingCacheMvs){
        existingCacheMvs = await get_all_results("films");
    }

    if(!existingCachePpl){
        existingCachePpl = await get_all_results("people");
    }

    

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