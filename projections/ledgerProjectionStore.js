"use strict";
exports.__esModule = true;
var factory = function () {
    var projections = [];
    var contract = function () {
        return {
            account: undefined,
            balance: undefined,
            transactions: undefined,
            type: undefined
        };
    };
    var project = function (data) {
        var newProjection = {
            account: data.account,
            balance: data.balance,
            id: Date.now(),
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
exports.ledgerProjectionStore = singleton;
