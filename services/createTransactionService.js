"use strict";
exports.__esModule = true;
var transactionProjectionStore_1 = require("../projections/transactionProjectionStore");
var newTransactionCreatedPublisher_1 = require("../publishers/newTransactionCreatedPublisher");
var ledgerProjectionStore_1 = require("../projections/ledgerProjectionStore");
var factory = function () {
    var process = function (parameters) {
        var newTransaction = undefined;
        var createTransactionProjection = function () {
            var projection = transactionProjectionStore_1.transactionProjectionStore.project.contract();
            projection.amount = parameters.amount;
            projection.destination = parameters.destination;
            projection.ledgerId = parameters.ledgerId;
            projection.source = parameters.source;
            projection.type = parameters.type;
            newTransaction = transactionProjectionStore_1.transactionProjectionStore.project(projection);
        };
        var publishTransactionCreated = function () {
            var eventData = newTransactionCreatedPublisher_1.newTransactionCreatedPublisher.publish.contract();
            eventData.transaction = newTransaction;
            eventData.sagaId = parameters.sagaId;
            newTransactionCreatedPublisher_1.newTransactionCreatedPublisher.publish(eventData);
        };
        var updateLedgerProjection = function () {
            var ledgerId = parameters.ledgerId;
            var ledger = ledgerProjectionStore_1.ledgerProjectionStore.getById(ledgerId);
            ledger.balance -= newTransaction.amount;
        };
        createTransactionProjection();
        updateLedgerProjection();
        publishTransactionCreated();
    };
    process.contract = function () {
        return {
            source: undefined,
            destination: undefined,
            type: undefined,
            amount: undefined,
            ledger: undefined
        };
    };
    return {
        process: process
    };
};
var singleton = factory();
exports.createTransactionService = singleton;
