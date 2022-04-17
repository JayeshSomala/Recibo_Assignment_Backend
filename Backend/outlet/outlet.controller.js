const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const outletService = require('./outlet.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    outletService.getAll()
        .then(outlets => res.json(outlets))
        .catch(next);
}

function getById(req, res, next) {
    outletService.getById(req.params.id)
        .then(outlet => res.json(outlet))
        .catch(next);
}

function create(req, res, next) {
    outletService.create(req.body)
        .then(() => res.json({ message: 'Outlet added' }))
        .catch(next);
}

function update(req, res, next) {
    outletService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Outlet updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    outletService.delete(req.params.id)
        .then(() => res.json({ message: 'Outlet deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.number().required(),
        Address: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().empty(''),
        Phone: Joi.number().empty(''),
        Address: Joi.address().empty(''),
    });
    validateRequest(req, next, schema);
}
