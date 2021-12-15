const {user, preValidation} = require('../models/user');
const router = express.router();

router.get('/', async(req,res)=> {
    return('TEST-OK');
})

module.exports.credential_routes = router;

