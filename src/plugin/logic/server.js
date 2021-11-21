const set = (state, data) => {
  return {
    ...state,
    arr: [...(state.arr || []), data.item],
  };
};

const open = (state, data) => {
  return state;
};

//! Only functions added to events object will be avaliable to invoke on the server
const events = {
  set,
  __OPEN: open,
};

//! DO NOT change this export
module.exports = {
  default: events,
};
