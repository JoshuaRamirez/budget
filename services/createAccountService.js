"use strict";
exports.__esModule = true;
var accountProjectionStore_1 = require("../projections/accountProjectionStore");
var newLedgerRequestedPublisher_1 = require("../publishers/newLedgerRequestedPublisher");
var factory = function () {
    var process = function (parameters) {
        var createLedgerProjection = function () {
            var newAccount = accountProjectionStore_1.accountProjectionStore.project.contract();
            newAccount.name = parameters.name;
            newAccount.type = parameters.type;
            newAccount = accountProjectionStore_1.accountProjectionStore.project(newAccount);
            return newAccount;
        };
        var requestNewLedger = function (newAccount) {
            var newLedgerRequestedContract = newLedgerRequestedPublisher_1.newLedgerRequestedPublisher.publish.contract();
            newLedgerRequestedContract.account = newAccount;
            newLedgerRequestedContract.type = "Account";
            newLedgerRequestedPublisher_1.newLedgerRequestedPublisher.publish(newLedgerRequestedContract);
        };
        var newAccount = createLedgerProjection();
        requestNewLedger(newAccount);
    };
    process.contract = function () {
        return {
            name: undefined,
            type: undefined
        };
    };
    return {
        process: process
    };
};
var singleton = factory();
exports.createAccountService = singleton;
