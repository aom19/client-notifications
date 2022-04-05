import { CREATE_CONTACT } from "../actions/contact";

const initialState = {
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.concat(action.contact),
      };
  }
  return state;
};
