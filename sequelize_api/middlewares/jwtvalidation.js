const {jwtPassword} = require("../config");
const jwt = require("jsonwebtoken");


function loginCheckMiddleware(req, res, next) {
    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = jwt.verify(jwtToken, jwtPassword);
        console.log(decodedValue)
        if (decodedValue.email) {
            console.log(decodedValue.email)
            next();
        } else {
            res.status(403).json({
                "auth":"fasle",
                "message": "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            "auth":"fasle",
            "mesasge": "Incorrect inputs"
        })
    }
}

module.exports = {loginCheckMiddleware};