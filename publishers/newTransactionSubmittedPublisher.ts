import { eventDataStore } from "../data/eventDataStore";

const factory = () => {

  const eventName = "newTransactionSubmitted";
  const subscriptions = [];

  const contract = () => {
    return {
      source: undefined,
      destination: undefined,
      type: undefined,
      amount: undefined,
      ledger: undefined,
    };
  };

  const publish = (eventData) => {

    eventData = {
      eventId: Date.now(),
      eventName,
      sagaId: eventData.sagaId,
      source: eventData.source,
      destination: eventData.destination,
      type: eventData.type,
      amount: eventData.amount,
      ledgerId: eventData.ledgerId,
    };

    eventDataStore.record(eventData);
    subscriptions.forEach((handler) => handler(eventData));

    return {
      eventName,
      eventData,
    };

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

export { singleton as newTransactionSubmittedPublisher };
