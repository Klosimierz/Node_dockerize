module.exports = function(handler) {
    return async(req,res,next)=>{
        try{
            handler(req,res);
        }
        catch(exc){
            next(exc);
        }
    }
}