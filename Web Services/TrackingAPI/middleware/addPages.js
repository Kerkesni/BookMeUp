const trackingPerUser = require('../models/trackingPerUser')
const Joi = require('@hapi/joi');


const schema = Joi.object({
    UID: Joi.string()
        .required(),
    BID: Joi.string()
        .required(),
    date: Joi.number().required(),
    pages: Joi.number().required(),
})

module.exports = (req, res, next) => {
    let data = req.body
    if (schema.validate(data).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }

    trackingPerUser.findOne({
        UID: data.UID,
    }).then((trackingRecord) => {


        let date = trackingRecord.dates.find((pagesPerDate) => pagesPerDate.date === data.date)
        if (date) {
            res.send('Date Already Exists')
            return
        }

        trackingRecord.dates.push({
            date: data.date,
            pages: data.pages
        })
        trackingRecord.save()
            .then(() => res.send("Pages Added"))
            .catch(() => res.status(500).send('Internal Error'))
    }).catch(() => res.status(500).send('Internal Error'))

}