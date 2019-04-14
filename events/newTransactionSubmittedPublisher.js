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
      source: eventData.source,
      destination: eventData.destination,
      type: eventData.type,
      amount: eventData.amount,
      ledger: eventData.ledger,
    };

    eventDataStore.record(eventData);
    subscriptions.forEach(handler => handler(eventData));

    return {
      eventName: eventName,
      eventData: eventData
    };

  };

  publish.contract = contract;

  const subscribe = (handler) => {
    subscriptions.push(handler);
  };

  return {
    eventName: eventName,
    publish: publish,
    subscribe: subscribe
  };

};

const singleton = factory();

export { singleton as newTransactionSubmittedPublisher };
