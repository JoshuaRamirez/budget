"use strict";
exports.__esModule = true;
var newAllocationSubmittedPublisher_1 = require("../publishers/newAllocationSubmittedPublisher");
var createAllocationService_1 = require("../services/createAllocationService");
var factory = function () {
    var process = function (parameters) {
        createAllocationService_1.createAllocationService.process(parameters);
    };
    var subscribe = function () {
        newAllocationSubmittedPublisher_1.newAllocationSubmittedPublisher.subscribe(process);
    };
    return {
        process: process,
        subscribe: subscribe
    };
};
var singleton = factory();
exports.newAllocationSubmittedSubscriber = singleton;
