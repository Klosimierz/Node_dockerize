const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/films', async (req,res)=>{
    let response;
    let {page,size} = req.query;
   
    if(Number.isInteger(req.body.id)) {
        response = await axios.get(`https://swapi.py4e.com/api/films/${req.body.id}`);
    }
    else {
        page ? page : page = 1;
        size ? size : size = 10;
        response = await axios.get("https://swapi.py4e.com/api/films/");
    }
    res.send(response.data);
});

router.get('/species', async (req,res)=>{
    const {data} = await axios.get('https://swapi.py4e.com/api/species/');
    res.send(data.results);
});

router.get('/vehicles', async (req,res)=>{
    const {data} = await axios.get('https://swapi.py4e.com/api/vehicles/');
    res.send(data.results);
});

router.get('/starships', async (req,res)=>{
    const {data} = await axios.get('https://swapi.py4e.com/api/starships/');
    res.send(data.results);
});

router.get('/planets', async (req,res)=>{
    const {data} = await axios.get('https://swapi.py4e.com/api/planets/');
    res.send(data.results);
});

router.get('/wordpairs', async (req,res)=>{
    const {data} = await axios.get('https://swapi.py4e.com/api/films/1');
    let text = ((data.opening_crawl).replace(/[\r\n.,]/g,' ')).replace(/\s{2,}/g," ");
    
    let wordArray = text.split(" ").filter((e)=>{return e != ''});
});

router.get('/common_name', async (req,res)=>{

});

module.exports = router;