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
      amount: eventData.amount,
      eventId: Date.now(),
      eventName,
      ledgerId: eventData.ledgerId,
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

export { singleton as newAllocationSubmittedPublisher };
