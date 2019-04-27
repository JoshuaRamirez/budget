import { eventDataStore } from "../data/eventDataStore";

const factory = () => {

  const eventName = "newLedgerRequested";
  const subscriptions = [];

  const contract = () => {
    return {
      account: undefined,
      type: undefined,
    };
  };

  const publish = (eventData) => {

    eventData = {
      account: eventData.account,
      name: eventData.name,
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

export { singleton as newLedgerRequestedPublisher };
