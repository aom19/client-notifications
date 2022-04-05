export const CREATE_CONTACT = "CREATE_CONTACT";

export const createContact = (email, name, description) => {
  return (dispatch) => {
    let contact = {
      id: email,
      email: email,
      name: name,
      description: description,
    };
    dispatch({
      type: CREATE_CONTACT,
      contact: contact,
    });
  };
};
