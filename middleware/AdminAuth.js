var jwt = require("jsonwebtoken");
var secret = "dsaqqopremfcfnac";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        var token = bearer[1];

        try{
            var decoded = jwt.verify(token, secret);
            
            if(decoded.role == 1){
                next();
            }else{
                res.status(403);
                res.send("User do not have permission!");
                return;
            }            
        }catch(err){
            res.status(403);
            res.send("Not Authenticated!");
            return;
        }
    }else{
        res.status(403);
        res.send("Authentication Problem!");
        return;
    }
}