const trackingPerUser = require('../models/trackingPerUser')
const Joi = require('@hapi/joi');


const schema = Joi.object({
    UID: Joi.string()
        .required(),
})

module.exports = (req, res, next) => {
    if (schema.validate({
            UID: req.params.uid
        }).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }

    trackingPerUser.findOne({
        UID: req.params.uid,
    }).then((trackingRecord) => {
        res.send(trackingRecord)
    }).catch(() => res.status(500).send('Internal Error'))

}