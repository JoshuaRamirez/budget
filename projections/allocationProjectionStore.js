"use strict";
exports.__esModule = true;
var factory = function () {
    var projections = [];
    var contract = function () {
        return {
            amount: undefined,
            ledgerId: undefined
        };
    };
    var project = function (data) {
        var newProjection = {
            id: Date.now(),
            amount: data.amount,
            ledgerId: data.ledgerId
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
exports.allocationProjectionStore = singleton;
