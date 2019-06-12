// Important to create file so we can import whenever we need a secret 
// In production, we'll use whatever we set up secretly on production server
// No secrets should ever be pushed to a repository 
module.exports = {
    jwtSecret: process.emitWarning.JWT_SECRET || 'keep it secret, keep it safe'
};