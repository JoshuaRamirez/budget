const factory = () => {

  const eventMetas: any[] = [];

  const record = (eventData) => {
    const eventName = eventData.EventName;
    const eventMeta = {
      eventData,
      eventName,
    };
    if (!eventMetas[eventName]) {
      eventMetas[eventName] = [];
    }
    eventMetas[eventName].push(eventMeta);
  };

  const replay = () => {
    eventMetas.forEach((eventMeta) => {
      return eventMeta;
    });
  };

  return {
    record,
  };

};

const singleton = factory();

export {singleton as eventDataStore, factory as eventStoreFactory};
