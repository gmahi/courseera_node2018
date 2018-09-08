const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dishRouter = express.Router();
const Dishes = require("../models/dishes");

dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Dishes.create(req.body)
            .then((dish) => {
                console.log("Dish Created", dish);
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err))
        //  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res, next) => {

        Dishes.remove({})
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        // res.end('Deleting all dishes');
    });

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => next(err));
        //  res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
    })

    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.json(dish)
            })
            .catch((err) => next(err));
        /*  res.write('Updating the dish: ' + req.params.dishId + '\n');
         res.end('Will update the dish: ' + req.body.name +
             ' with details: ' + req.body.description); */
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        //  res.end('Will delete  the dish: ' + req.params.dishId + '!');
    });





module.exports = dishRouter;