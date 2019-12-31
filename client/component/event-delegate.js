let _increment = 0;

const _subscribers = {};

export const subscribe = delegate => {
  const id = ++_increment;

  _subscribers[id] = delegate;

  return id;
};

export const unsubscribe = id => {
  delete _subscribers[id];
};

export const triggerSomeWhereClick = (e, srcId) => {
  Object.keys(_subscribers)
    .filter(id => id !== srcId.toString())
    .forEach(id => {
      const delegate = _subscribers[id];

      if (delegate.onSomeWhereClick instanceof Function) {
        delegate.onSomeWhereClick(e);
      }
    });
};

export const eventHandlers = {
  onClick: e => {
    Object.values(_subscribers).forEach(delegate => {
      if (delegate.onSomeWhereClick instanceof Function) {
        delegate.onSomeWhereClick(e);
      }
    });
  }
};
