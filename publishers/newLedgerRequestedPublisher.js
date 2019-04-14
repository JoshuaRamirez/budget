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
      name: eventData.name,
      account: eventData.account,
      type: eventData.type,
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
    subscribe: subscribe
  };

};

const singleton = factory();

export { singleton as newLedgerRequestedPublisher };
