"use strict";
exports.__esModule = true;
var eventDataStore_1 = require("../data/eventDataStore");
var factory = function () {
    var eventName = "newLedgerRequested";
    var subscriptions = [];
    var contract = function () {
        return {
            account: undefined,
            type: undefined
        };
    };
    var publish = function (eventData) {
        eventData = {
            name: eventData.name,
            account: eventData.account,
            type: eventData.type
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
exports.newLedgerRequestedPublisher = singleton;
