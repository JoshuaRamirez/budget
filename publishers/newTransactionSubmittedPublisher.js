"use strict";
exports.__esModule = true;
var eventDataStore_1 = require("../data/eventDataStore");
var factory = function () {
    var eventName = "newTransactionSubmitted";
    var subscriptions = [];
    var contract = function () {
        return {
            source: undefined,
            destination: undefined,
            type: undefined,
            amount: undefined,
            ledger: undefined
        };
    };
    var publish = function (eventData) {
        eventData = {
            eventId: Date.now(),
            eventName: eventName,
            sagaId: eventData.sagaId,
            source: eventData.source,
            destination: eventData.destination,
            type: eventData.type,
            amount: eventData.amount,
            ledgerId: eventData.ledgerId
        };
        eventDataStore_1.eventDataStore.record(eventData);
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
exports.newTransactionSubmittedPublisher = singleton;
