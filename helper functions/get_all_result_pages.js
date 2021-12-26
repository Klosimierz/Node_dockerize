const axios = require('axios');
const { cache } = require('../models/caching');

module.exports = async function(endpoint) {  
    let resultsArray;
    response = await axios.get(`https://swapi.py4e.com/api/${endpoint}`);
            resultsArray = response.data.results;
            while (response.data.next !== null) {
                response = await axios.get(response.data.next);
                resultsArray = resultsArray.concat(response.data.results);
            }
            let addCache = new cache({
                endpoint: endpoint,
                payload: resultsArray,
                expiryDate: new Date(Date.now() + 86400000)
            });
            const result = await addCache.save();
            return result;
}