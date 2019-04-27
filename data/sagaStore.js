"use strict";
exports.__esModule = true;
var factory = function () {
    var sagas = [];
    var saveSaga = function (sagaName, sagaData) {
        var saga = {
            sagaId: Date.now(),
            sagaName: sagaName,
            sagaData: sagaData
        };
        if (!sagas[sagaName]) {
            sagas[sagaName] = [];
        }
        sagas[sagaName].push(saga);
        return saga;
    };
    var getSaga = function (sagaName, sagaId) {
        var foundSaga = null;
        if (sagaName) {
            if (!sagas[sagaName]) {
                return undefined;
            }
            sagas[sagaName].forEach(function (saga) {
                if (saga.sagaId === sagaId)
                    foundSaga = saga;
            });
        }
        return foundSaga;
    };
    return {
        saveSaga: saveSaga,
        getSaga: getSaga
    };
};
var singleton = factory();
exports.sagaStore = singleton;
