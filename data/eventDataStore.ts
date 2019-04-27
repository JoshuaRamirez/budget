const factory = () => {

  const eventMetas = [];

  const record = (eventName, eventData) => {
    const eventMeta = {
      eventName,
      eventData,
    };
    if (!eventMetas[eventName]) {
      eventMetas[eventName] = [];
    }
    eventMetas[eventName].push(eventMeta);
  };

  const replay = () => {
    eventMetas.forEach((eventMeta) => {
      eventMeta;
    });
  };

  return {
    record,
  };

};

const singleton = factory();

export {singleton as eventDataStore, factory as eventStoreFactory};
