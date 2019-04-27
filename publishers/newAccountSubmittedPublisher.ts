import { eventDataStore } from "../data/eventDataStore";

const factory = () => {

  const eventName = "newAccountSubmitted";
  const subscriptions = [];

  const contract = () => {
    return {
      name: undefined,
      type: undefined,
    };
  };

  const publish = (eventData) => {

    eventData = {
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

export { singleton as newAccountSubmittedPublisher };
