function isAdmin(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'jwtsecret');
    if (decoded.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
}
