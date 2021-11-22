const add = (state, event) => {
  return {
    ...state,
    events: [
      ...(state.events || []),
      event,
    ],
  };
};

const open = (state, data) => {
  return state;
};

//! Only functions added to events object will be avaliable to invoke on the server
const events = {
  add,
  __OPEN: open,
};

//! DO NOT change this export
module.exports = {
  default: events,
};
