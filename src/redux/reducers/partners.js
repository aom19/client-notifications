import {
  SET_PARTNERS,
  DELETE_PARTNERS,
  CREATE_PARNTERS,
  EDIT_PARTNERS,
  CREATE_PARTNERS,
} from "../actions/partners";

const initialState = {
  partners: [],
  latestPartners: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTNERS:
      return {
        partners: action.partners,
        latestPartners: action.latestPartners,
      };
    case CREATE_PARTNERS:
      return {
        ...state,
        partners: state?.partners.concat(action.newPartner),
        latestPartners: state?.latestPartners.concat(action.newPartner),
      };
    case EDIT_PARTNERS:
      const newPartners = state.partners.map((partner) => {
        if (partner._id === action.id) {
          return {
            ...partner,
            name: action.partner.name,
            email: action.partner.email,
            description: action.partner.description,
            partnerImage: action.partner.partnerImage,
          };
        }
        return partner;
      });

      return {
        partners: newPartners,
      };
    case DELETE_PARTNERS:
      return {
        ...state,
        partners: state.partners.filter((partner) => partner._id !== action.id),
      };
  }
  return state;
};
