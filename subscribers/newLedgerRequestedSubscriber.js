"use strict";
exports.__esModule = true;
var newLedgerRequestedPublisher_1 = require("../publishers/newLedgerRequestedPublisher");
var createLedgerService_1 = require("../services/createLedgerService");
var factory = function () {
    var process = function (parameters) {
        createLedgerService_1.createLedgerService.process(parameters);
    };
    var subscribe = function () {
        newLedgerRequestedPublisher_1.newLedgerRequestedPublisher.subscribe(process);
    };
    return {
        process: process,
        subscribe: subscribe
    };
};
var singleton = factory();
exports.newLedgerRequestedSubscriber = singleton;
