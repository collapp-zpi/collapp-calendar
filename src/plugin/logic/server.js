const create = (state, event) => {
  const id = Math.random().toString(36).substr(2,9)
  return {
    ...state,
    events: {
      ...(state?.events || {}),
      [id]: event,
    },
  };
};

const update = (state, { id, ...event }) => {
  return {
    ...state,
    events: {
      ...(state?.events || {}),
      [id]: event,
    },
  };
};

const remove = (state, id) => {
  const events = { ...(state?.events || {}) }
  delete events[id]

  return {
    ...state,
    events,
  };
};

const open = (state, data) => {
  return state;
};

//! Only functions added to events object will be avaliable to invoke on the server
const events = {
  create,
  update,
  remove,
  __OPEN: open,
};

//! DO NOT change this export
module.exports = {
  default: events,
};
