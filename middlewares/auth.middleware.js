const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.isAunthenticated = (req, res, next) => {

    if (authorization) {
        const [type, token] = authorization.split(' ');

        if (type === 'Bearer') {
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET || "Super Secret", (err, decodedToken) => {
                    if (err) {
                        next(err);
                    } else {
                        req.currentUser = decodedToken.id;
                        next();
                    }
                })
            } else {
                next(createError(StatusCodes.UNAUTHORIZED, 'Token error'));
            } 
        } else {
            next(createError(StatusCodes.UNAUTHORIZED, 'Bearer error'));
        }
    } else {
        next(createError(StatusCodes.UNAUTHORIZED, 'No Authoritation'));
    }

}