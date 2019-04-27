import {sagaStore} from "../data/sagaStore";
import {allocationProjectionStore} from "../projections/allocationProjectionStore";
import {newAllocationSubmittedPublisher} from "../publishers/newAllocationSubmittedPublisher";
import {newTransactionCreatedPublisher} from "../publishers/newTransactionCreatedPublisher";
import {newTransactionSubmittedPublisher} from "../publishers/newTransactionSubmittedPublisher";

const factory = () => {

  const process = (parameters) => {

    const sagaName = newAllocationSubmittedPublisher.eventName;

    const createAllocationProjection = (saga) => {
      const originalEvent = saga.sagaData.originalEvent;
      const newAllocation = allocationProjectionStore.project.contract();
      newAllocation.amount = originalEvent.amount;
      newAllocation.ledgerId = originalEvent.ledgerId;
      newAllocation.transactionId = saga.sagaData.transactionId;
      allocationProjectionStore.project(newAllocation);
    };

    const submitNewTransaction = (saga) => {
      const eventData = newTransactionSubmittedPublisher.publish.contract();
      eventData.amount = parameters.amount;
      eventData.destination = parameters.destination;
      eventData.ledgerId = parameters.ledgerId;
      eventData.source = "Allocation";
      eventData.type = "Allocation";
      if (saga) { eventData.sagaId = saga.sagaId; }
      newTransactionSubmittedPublisher.publish(eventData);
    };

    // New Allocation Submitted
    if (parameters.eventName === newAllocationSubmittedPublisher.eventName) {
      const sagaData = {
        originalEvent: parameters,
      };
      const saga = sagaStore.saveSaga(sagaName, sagaData);
      submitNewTransaction(saga);
    }

    // New Transaction Created
    if (parameters.eventName === newTransactionCreatedPublisher.eventName) {
      if (!parameters.sagaId) { return; }
      const sagaId = parameters.sagaId; // TODO: Standardize ID Names
      const saga = sagaStore.getSaga(sagaName, sagaId);
      saga.sagaData.transactionId = parameters.transaction.id; // TODO: Standardize ID Names
      createAllocationProjection(saga);
    }

  };

  process.contract = () => {
    return {
      amount: undefined,
      ledgerId: undefined,
    };
  };

  return {
    process,
  };

};

const singleton = factory();

export {singleton as createAllocationService};
