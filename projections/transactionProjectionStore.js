"use strict";
exports.__esModule = true;
var factory = function () {
    var projections = [];
    var contract = function () {
        return {
            amount: undefined,
            destination: undefined,
            ledger: undefined,
            type: undefined,
            source: undefined
        };
    };
    var project = function (data) {
        var newProjection = {
            amount: data.amount,
            destination: data.destination,
            id: Date.now(),
            ledger: data.ledger,
            source: data.source,
            type: data.type
        };
        projections.push(newProjection);
        return newProjection;
    };
    project.contract = contract;
    var getById = function (id) {
        return projections.find(function (projection) { return projection.id === id; });
    };
    return {
        all: projections,
        getById: getById,
        project: project
    };
};
var singleton = factory();
exports.transactionProjectionStore = singleton;
