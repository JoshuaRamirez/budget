"use strict";
exports.__esModule = true;
var createTransactionService_1 = require("../services/createTransactionService");
var newTransactionSubmittedPublisher_1 = require("../publishers/newTransactionSubmittedPublisher");
var factory = function () {
    var process = function (parameters) {
        createTransactionService_1.createTransactionService.process(parameters);
    };
    var subscribe = function () {
        newTransactionSubmittedPublisher_1.newTransactionSubmittedPublisher.subscribe(process);
    };
    return {
        process: process,
        subscribe: subscribe
    };
};
var singleton = factory();
exports.newTransactionSubmittedSubscriber = singleton;
