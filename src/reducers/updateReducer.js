const updateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      state[action.payload.country][action.payload.state][action.payload.city] =
        action.payload.payload;
      return state;
    case "UPDATE_STATE":
      return action.payload;
    default:
      return state;
  }
};

export default updateReducer;
