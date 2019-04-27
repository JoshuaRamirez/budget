import { eventDataStore } from "../data/eventDataStore";

const factory = () => {

  const eventName = "newTransactionSubmitted";
  const subscriptions = [];

  const contract = () => {
    return {
      amount: undefined,
      destination: undefined,
      ledgerId: undefined,
      sagaId: undefined,
      source: undefined,
      type: undefined,
    };
  };

  const publish = (eventData) => {

    eventData = {
      amount: eventData.amount,
      destination: eventData.destination,
      eventId: Date.now(),
      eventName,
      ledgerId: eventData.ledgerId,
      sagaId: eventData.sagaId,
      source: eventData.source,
      type: eventData.type,
    };

    eventDataStore.record(eventData);
    subscriptions.forEach((handler) => handler(eventData));

    return {
      eventData,
      eventName,
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
