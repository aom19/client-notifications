import axios from "axios";

export const SET_PARTNERS = "SET_PARTNERS";
export const CREATE_PARTNERS = "CREATE_PARTNERS";
export const EDIT_PARTNERS = "EDIT_PARTNERS";
export const DELETE_PARTNERS = "DELETE_PARTNERS";

export const fetchPartners = () => {
  return async (dispatch) => {
    axios
      .get("http://localhost:8000/partners")
      .then((res) => {
        console.log(res.data);
        const fetchedPartners = res.data;
        let latestPartners = fetchedPartners?.slice(
          Math.max(fetchedPartners?.length - 6, 0)
        );

        dispatch({
          type: SET_PARTNERS,
          partners: fetchedPartners,
          latestPartners: latestPartners,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const createPartner = (
  email,
  name,
  description,
  partnerImage,
  formData
) => {
  console.log(email, name, description, partnerImage);

  return async (dispatch) => {
    const partner = {
      name,
      email,
      description,
      partnerImage,
    };
    axios
      .post("http://localhost:8000/partners/add", formData)
      .then((res) => {
        console.log(res.data);

        dispatch({
          type: SET_PARTNERS,
          newPartner: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editPartner = (
  id,
  name,
  description,
  email,
  partnerImage,
  formData
) => {
  return async (dispatch) => {
    const editPartner = {
      name: name,
      description: description,
      email: email,
      partnerImage: partnerImage,
    };

    axios
      .put(`http://localhost:8000/partners/update/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: EDIT_PARTNERS,
          partner: res.data,
          id: id,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePartner = (id) => {
  return async (dispatch) => {
    axios
      .delete(`http://localhost:8000/partners/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: DELETE_PARTNERS,
          id: id,
        });
      })
      .catch((err) => console.log(err));
  };
};
