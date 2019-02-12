let initialState = {
  players: { count: 0, results: [] },
  teams: { count: 0, results: [] }
};

// let initialState = { results: [] };

export default (state = initialState, action) => {
  let { type, payload = {} } = action;
  let { id, model, record, records } = payload;

  switch (type) {
    case "GET":
      // return payload;
      return { ...state, [model]: records };

    case "POST":
      const newRecords = state[model].concat(record);
      return {
        ...state,
        [model]: newRecords
      };

    case "DELETE":
      let deleteList = state[model].filter((r, idx) => idx !== id);
      return { ...state, [model]: deleteList };

    case "PUT":
      let putList = state[model].map((entry, idx) => (idx === id ? record : entry));
      return { ...state, [model]: putList };

    case "PATCH":
      return state;

    default:
      return state;
  }
};
