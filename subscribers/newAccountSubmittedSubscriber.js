"use strict";
exports.__esModule = true;
var newAccountSubmittedPublisher_1 = require("../publishers/newAccountSubmittedPublisher");
var createAccountService_1 = require("../services/createAccountService");
var factory = function () {
    var process = function (parameters) {
        createAccountService_1.createAccountService.process(parameters);
    };
    var subscribe = function () {
        newAccountSubmittedPublisher_1.newAccountSubmittedPublisher.subscribe(process);
    };
    return {
        process: process,
        subscribe: subscribe
    };
};
var singleton = factory();
exports.newAccountSubmittedSubscriber = singleton;
