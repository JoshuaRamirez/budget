"use strict";
exports.__esModule = true;
var eventDataStore_1 = require("../data/eventDataStore");
var factory = function () {
    var eventName = "newAllocationSubmitted";
    var subscriptions = [];
    var contract = function () {
        return {
            amount: undefined,
            transactionId: undefined
        };
    };
    var publish = function (eventData) {
        eventData = {
            eventId: Date.now(),
            eventName: eventName,
            amount: eventData.amount,
            ledgerId: eventData.ledgerId
        };
        eventDataStore_1.eventDataStore.record(eventName, eventData);
        subscriptions.forEach(function (handler) { return handler(eventData); });
        return {
            eventName: eventName,
            eventData: eventData
        };
    };
    publish.contract = contract;
    var subscribe = function (handler) {
        subscriptions.push(handler);
    };
    return {
        eventName: eventName,
        publish: publish,
        subscribe: subscribe
    };
};
var singleton = factory();
exports.newAllocationSubmittedPublisher = singleton;
