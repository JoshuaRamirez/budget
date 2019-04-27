"use strict";
exports.__esModule = true;
var factory = function () {
    var eventMetas = [];
    var record = function (eventName, eventData) {
        var eventMeta = {
            eventName: eventName,
            eventData: eventData
        };
        if (!eventMetas[eventName]) {
            eventMetas[eventName] = [];
        }
        eventMetas[eventName].push(eventMeta);
    };
    var replay = function () {
        eventMetas.forEach(function (eventMeta) {
            eventMeta;
        });
    };
    return {
        record: record
    };
};
exports.eventStoreFactory = factory;
var singleton = factory();
exports.eventDataStore = singleton;
