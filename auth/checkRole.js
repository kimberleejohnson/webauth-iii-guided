// Writing the middleware function that takes a role
// Needs to return a piece of middleware, since request is there and req has user
module.exports = function (role) {
    return function(req, res, next) {
        if(req.user) {
            if (
                req.user.roles && 
                Array.isArray(req.user.roles) &&
                req.user.roles.includes(role)
                ){
                next(); 
            } else {
                res.status(403).json({message: "You don't have access."});
            }
        } else {
            res.status(401).json({message: 'You cannot pass!'});
        }
    }
};