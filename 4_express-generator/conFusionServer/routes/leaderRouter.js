const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const leaderRouter = express.Router();
const Leaders = require("../models/leaders")

leaderRouter.use(bodyParser.json());




leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Leaders.create(req.body)
            .then((leader) => {
                console.log("Dish Created", leader);
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err))
        //  res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next) => {

        Leaders.remove({})
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        // res.end('Deleting all leaders');
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err));
        //  res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
    })


    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /prmotions/'+ req.params.leaderId);
    })

    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.json(leader)
            })
            .catch((err) => next(err));
        /*  res.write('Updating the leader: ' + req.params.leaderId + '\n');
         res.end('Will update the leader: ' + req.body.name +
             ' with details: ' + req.body.description); */
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        //  res.end('Will delete  the leader: ' + req.params.leaderId + '!');
    });



module.exports = leaderRouter;