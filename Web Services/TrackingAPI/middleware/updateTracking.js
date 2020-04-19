const trackingPerUser = require('../models/trackingPerUser')
const Joi = require('@hapi/joi');


const schema = Joi.object({
    UID: Joi.string()
        .required(),
    BID: Joi.string()
        .required(),
    current_page: Joi.number().required(),
    total_pages: Joi.number().required(),
    finish_date: Joi.number().required(),
    last_read: Joi.number().required(),
})

module.exports = (req, res, next) => {
    let data = req.body
    if (schema.validate(data).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }

    trackingPerUser.updateOne({
            UID: data.UID,
            BID: data.BID
        }, data)
        .then(() => res.send("Tracking Updated"))
        .catch(() => res.status(500).send('Internal Error'))

}