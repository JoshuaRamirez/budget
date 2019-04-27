"use strict";
exports.__esModule = true;
var allocationProjectionStore_1 = require("../projections/allocationProjectionStore");
var newTransactionCreatedPublisher_1 = require("../publishers/newTransactionCreatedPublisher");
var newAllocationSubmittedPublisher_1 = require("../publishers/newAllocationSubmittedPublisher");
var newTransactionSubmittedPublisher_1 = require("../publishers/newTransactionSubmittedPublisher");
var sagaStore_1 = require("../data/sagaStore");
var factory = function () {
    var process = function (parameters) {
        var sagaName = newAllocationSubmittedPublisher_1.newAllocationSubmittedPublisher.eventName;
        var createAllocationProjection = function (saga) {
            var originalEvent = saga.sagaData.originalEvent;
            var newAllocation = allocationProjectionStore_1.allocationProjectionStore.project.contract();
            newAllocation.amount = originalEvent.amount;
            newAllocation.ledgerId = originalEvent.ledgerId;
            newAllocation.transactionId = saga.sagaData.transactionId;
            allocationProjectionStore_1.allocationProjectionStore.project(newAllocation);
        };
        var submitNewTransaction = function (saga) {
            var eventData = newTransactionSubmittedPublisher_1.newTransactionSubmittedPublisher.publish.contract();
            eventData.amount = parameters.amount;
            eventData.destination = parameters.destination;
            eventData.ledgerId = parameters.ledgerId;
            eventData.source = "Allocation";
            eventData.type = "Allocation";
            if (saga)
                eventData.sagaId = saga.sagaId;
            newTransactionSubmittedPublisher_1.newTransactionSubmittedPublisher.publish(eventData);
        };
        //New Allocation Submitted
        if (parameters.eventName === newAllocationSubmittedPublisher_1.newAllocationSubmittedPublisher.eventName) {
            var sagaData = {
                originalEvent: parameters
            };
            var saga = sagaStore_1.sagaStore.saveSaga(sagaName, sagaData);
            submitNewTransaction(saga);
        }
        //New Transaction Created
        if (parameters.eventName === newTransactionCreatedPublisher_1.newTransactionCreatedPublisher.eventName) {
            if (!parameters.sagaId)
                return;
            var sagaId = parameters.sagaId; //TODO: Standardize ID Names
            var saga = sagaStore_1.sagaStore.getSaga(sagaName, sagaId);
            saga.sagaData.transactionId = parameters.transaction.id; //TODO: Standardize ID Names
            createAllocationProjection(saga);
        }
    };
    process.contract = function () {
        return {
            amount: undefined,
            ledgerId: undefined
        };
    };
    return {
        process: process
    };
};
var singleton = factory();
exports.createAllocationService = singleton;
