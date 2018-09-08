const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();
const mongoose = require("mongoose");
const Promos = require("../models/promo");

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        Promos.find({})
            .then((promos) => {
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Promos.create(req.body)
            .then((promo) => {
                console.log("Dish Created", promo);
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err))
        //  res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT operation not supported on /promos');
    })
    .delete((req, res, next) => {

        Promos.remove({})
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        // res.end('Deleting all promos');
    });

promotionRouter.route('/:promoId')
    .get((req, res, next) => {
        Promos.findById(req.params.promoId)
            .then((promo) => {
                res.json(promo)
            }, (err) => next(err))
            .catch((err) => next(err));
        //  res.end('Will send details of the promo: ' + req.params.promoId +' to you!');
    })


    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /prmotions/'+ req.params.promoId);
    })

    .put((req, res, next) => {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promo) => {
                res.json(promo)
            })
            .catch((err) => next(err));
        /*  res.write('Updating the promo: ' + req.params.promoId + '\n');
         res.end('Will update the promo: ' + req.body.name +
             ' with details: ' + req.body.description); */
    })
    .delete((req, res, next) => {
        Promos.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        //  res.end('Will delete  the promo: ' + req.params.promoId + '!');
    });


module.exports = promotionRouter;