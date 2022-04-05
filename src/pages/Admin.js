import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import Section from "../components/Section/Section";
import ListPartners from "../components/ListPartners/ListPartners";
import Modal from "react-bootstrap/Modal";

//assets
import image1 from "../assets/bg_6.jpeg";

//actions
import {
  createPartner,
  fetchPartners,
  editPartner,
} from "../redux/actions/partners";
import { Button } from "@material-ui/core";

const Admin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    description: "",
  });
  const [partnerImage, setPartnerImage] = useState("");

  useEffect(async () => {
    await dispatch(fetchPartners);
  }, []);

  const partners = useSelector((state) => state?.partners?.partners);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeFile = (e) => {
    setPartnerImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("description", values.description);
    formData.append("partnerImage", partnerImage);

    console.log(formData);

    await dispatch(
      createPartner(
        values.name,
        values.email,
        values.description,
        partnerImage,
        formData
      )
    );
  };
  const onEditDetail = (_id) => {
    setEditForm(true);
    const parnterIndex = partners.filter((x) => x._id === _id);

    setValues({
      name: parnterIndex[0].name,
      id: _id,
      email: parnterIndex[0].email,
      description: parnterIndex[0].description,
    });
    setPartnerImage(parnterIndex[0].partnerImage);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("description", values.description);
    formData.append("partnerImage", partnerImage);

    await dispatch(
      editPartner(
        values.id,
        values.name,
        values.description,
        values.email,
        partnerImage,
        formData
      )
    );
  };

  return (
    <div>
      {" "}
      <Section image={image1} page={"Admin"} name={"Aministrator"} />
      <section style={{ margin: "10%" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={"+"}
          onClick={() => setShowForm(true)}
        >
          Add Partner
        </Button>

        <ListPartners latestPartners={partners} onEdit={onEditDetail} admin />

        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Add new partner <span style={{ color: "#0d6efd" }}></span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="request-form  bg-primary"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <h2>New Partner</h2>
              <div className="d-flex">
                <div className="form-group mr-2 ">
                  <label for="" className="label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label for="" className="label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
                    name="partnerImage"
                    value={values.partnerImage}
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Submit "
                  className="btn btn-secondary py-3 px-4"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={editForm} onHide={() => setEditForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Add new partner <span style={{ color: "#0d6efd" }}></span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="request-form  bg-primary"
              onSubmit={handleSubmitEdit}
            >
              <h2>New Partner</h2>
              <div className="d-flex">
                <div className="form-group mr-2 ">
                  <label for="" className="label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label for="" className="label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    Image URL
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
                    name="partnerImage"
                    value={values.partnerImage}
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Submit "
                  className="btn btn-secondary py-3 px-4"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default Admin;
