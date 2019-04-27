"use strict";
exports.__esModule = true;
var eventDataStore_1 = require("../data/eventDataStore");
var factory = function () {
    var eventName = "newTransactionCreated";
    var subscriptions = [];
    var contract = function () {
        return {
            transaction: undefined
        };
    };
    var publish = function (eventData) {
        eventData = {
            eventId: Date.now(),
            eventName: eventName,
            transaction: eventData.transaction,
            sagaId: eventData.sagaId
        };
        eventDataStore_1.eventDataStore.record(eventData);
        subscriptions.forEach(function (handler) { return handler(eventData); });
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
exports.newTransactionCreatedPublisher = singleton;
