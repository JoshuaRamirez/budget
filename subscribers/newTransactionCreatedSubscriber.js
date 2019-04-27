"use strict";
exports.__esModule = true;
var createAllocationService_1 = require("../services/createAllocationService");
var newTransactionCreatedPublisher_1 = require("../publishers/newTransactionCreatedPublisher");
var factory = function () {
    var process = function (parameters) {
        createAllocationService_1.createAllocationService.process(parameters);
    };
    var subscribe = function () {
        newTransactionCreatedPublisher_1.newTransactionCreatedPublisher.subscribe(process);
    };
    return {
        process: process,
        subscribe: subscribe
    };
};
var singleton = factory();
exports.newTransactionCreatedSubscriber = singleton;
