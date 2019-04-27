import { eventDataStore } from "../data/eventDataStore";

const factory = () => {

  const eventName = "newTransactionCreated";
  const subscriptions = [];

  const contract = () => {
    return {
      transaction: undefined,
    };
  };

  const publish = (eventData) => {

    eventData = {
      eventId: Date.now(),
      eventName,
      transaction: eventData.transaction,
      sagaId: eventData.sagaId,
    };

    eventDataStore.record(eventData);
    subscriptions.forEach((handler) => handler(eventData));

  };

  publish.contract = contract;

  const subscribe = (handler) => {
    subscriptions.push(handler);
  };

  return {
    eventName,
    publish,
    subscribe,
  };

};

const singleton = factory();

export { singleton as newTransactionCreatedPublisher };
