// Important to create file so we can import whenever we need a secret 
module.exports = {
    jwtSecret: process.emitWarning.JWT_SECRET || 'keep it secret, keep it safe'
}