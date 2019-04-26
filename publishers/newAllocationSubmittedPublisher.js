import { eventDataStore } from "../data/eventDataStore";

const factory = () => {

  const eventName = "newAllocationSubmitted";
  const subscriptions = [];

  const contract = () => {
    return {
      amount: undefined,
      transactionId: undefined,
    };
  };

  const publish = (eventData) => {

    eventData = {
      eventId: Date.now(),
      eventName: eventName,
      amount: eventData.amount,
      ledgerId: eventData.ledgerId,
    };

    eventDataStore.record(eventName, eventData);
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
    subscribe: subscribe,

  };

};

const singleton = factory();

export { singleton as newAllocationSubmittedPublisher };
