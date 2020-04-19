const trackingPerUser = require('../models/trackingPerUser')
const Joi = require('@hapi/joi');

const schema = Joi.object({
    UID: Joi.string()
        .required(),
    BID: Joi.string().required()
})

module.exports = (req, res, next) => {
    if (schema.validate({
            UID: req.params.uid,
            BID: req.params.bid
        }).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }
    trackingPerUser.deleteOne({
            UID: req.params.uid,
            BID: req.params.bid
        })
        .then(() => res.send("Tracking removed"))
        .catch(() => res.status(500).send('Internal Error'))

}