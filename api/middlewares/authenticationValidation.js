const zod = require("zod");





function emailFormatChecker(req, res, next) {
    const email = req.headers['email'].trim().toLowerCase();
    const emailCheck = zod.string().email();
    let response = emailCheck.safeParse(email);
    if (response.success)
    {
        next()
    }
    else {
        res.status(403).json({
            "email": "wrong email format"
        })
    }
}


function passwordFormatChecker(req, res, next) {
    const password = req.headers['password'].trim();
    const passwordCheck = zod.string().min(7);
    let response = passwordCheck.safeParse(password);
    if (response.success)
    {
        next()
    }
    else {
        res.status(403).json({
            "password": "The password should be at least 7 characters long"
        })
    }
}
function nameNullChecker(req, res, next) {
    const name = req.headers['fullname'].trim();
    const nameCheck = zod.string().min(1);
    let response = nameCheck.safeParse(name);
    if (response.success)
    {
        next()
    }
    else {
        res.status(403).json({
            "name": "The name should be at least 1 characters long"
        })
    }
}


module.exports = {emailFormatChecker, passwordFormatChecker ,nameNullChecker};