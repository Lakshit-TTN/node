module.exports = (req, res, next) => {
    req.body.created_on = new Date().toISOString();
    next();
};
