const gateway = require('fast-gateway')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const cache = require('http-cache-middleware')()


const Auth = require('./middlewares/Auth')
const IPSaver = require('./middlewares/IPSaver')

const server = gateway({
    middlewares: [cors(), cache, IPSaver,
        rateLimit({
            windowMs: 1 * 60 * 1000, // 1 minutes
            max: 60,
            handler: (req, res) => res.send('Too many requests, please try again later.', 429)
        })
    ],
    routes: [{
            prefix: '/search',
            methods: ['GET'],
            middlewares: [Auth],
            target: 'http://127.0.0.1:3001'
        },
        {
            prefix: '/manage',
            methods: ['GET', 'POST', 'DELETE'],
            middlewares: [Auth],
            target: 'http://127.0.0.1:3002'
        },
        {
            prefix: '/auth',
            methods: ['POST'],
            target: 'http://127.0.0.1:3003',
        },
        {
            prefix: '/track',
            methods: ['GET', 'POST', 'DELETE'],
            target: 'http://127.0.0.1:3004',
        },
    ]
})

server.start(3000)