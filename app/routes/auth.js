const express = require('express')
    , cookieSession = require('cookie-session')
    , crypto = require('crypto');

const isBackofficeAuthentication = (req) => {
    const {uid, email, username, full_name, root, hmac} = req.query;
    const queryParamsToVerify =
        [
            `uid=${uid.toString()}`,
            `email=${email}`,
            `username=${username}`,
            `full_name=${full_name}`,
            `root=${root.toString()}`
        ].join('&');

    const generatedHmac = crypto.createHmac('sha256', process.env.BACKOFFICE_SECRET);
    generatedHmac.update(queryParamsToVerify);
    const expectedSignature = generatedHmac.digest('hex');

    return hmac === expectedSignature;
};

const sessionMiddleware = cookieSession({
    name: 'kudowall-session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secret: process.env.SESSION_SECRET || crypto.randomBytes(128).toString('hex')
});

const backofficeCallback = express.Router()
    .use(sessionMiddleware)
    .use((req, res) => {
        if (isBackofficeAuthentication(req)) {
            req.session.authenticated = true;
            res.redirect('/');
        } else {
            res.send('Autenticación fallida').status(403);
        }
    });

const autenticarConBackoffice = express.Router()
    .use(sessionMiddleware)
    .use((req, res, next) => {
        if (req.session && req.session.authenticated) {
            next();
        } else {
            const callbackUrl = `${process.env.URL}/auth/callback`;
            res.redirect(`https://${process.env.BACKOFFICE_HOST}/auth/sign_in?redirect_url=${callbackUrl}&app_id=kudowall`)
        }
    });

const autenticarWebhookDeSlack = (req, res, next) => {
    if (req.body.token === process.env.TOKEN) {
        next();
    } else {
        res.send('Hmmmmm.... algo no está bien').status(401);
    }
};

module.exports = {backofficeCallback, autenticarConBackoffice, autenticarWebhookDeSlack};
