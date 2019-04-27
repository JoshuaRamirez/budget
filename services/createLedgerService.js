"use strict";
exports.__esModule = true;
var ledgerProjectionStore_1 = require("../projections/ledgerProjectionStore");
var factory = function () {
    var process = function (parameters) {
        var createLedgerProjection = function () {
            var newLedger = ledgerProjectionStore_1.ledgerProjectionStore.project.contract();
            newLedger.account = parameters.account;
            newLedger.balance = 0;
            newLedger.transactions = [];
            newLedger.type = parameters.type;
            ledgerProjectionStore_1.ledgerProjectionStore.project(newLedger);
        };
        createLedgerProjection();
    };
    process.contract = function () {
        return {
            account: undefined,
            type: undefined
        };
    };
    return {
        process: process
    };
};
var singleton = factory();
exports.createLedgerService = singleton;
