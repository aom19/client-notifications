import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//utilities
import image1 from "../assets/bg_1.jpg";

//components
import Table from "../components/Pagination/Table";
import Section from "../components/Section/Section";

//actions
import { createContact } from "../redux/actions/contact";




const Contact = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state?.contact.contacts);

  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createContact(values.email, values.name, values.description));
  };
  return (
    <>
      <div>
        <Section image={image1} page={"Contact"} name={"Contact Us"} />
        <section class="ftco-section contact-section">
          <div class="container">
            <div class="row d-flex mb-5 contact-info">
              <div class="col-md-4">
                <div class="row mb-5">
                  <div class="col-md-12">
                    <div class="border w-100 p-4 rounded mb-2 d-flex">
                      <div class="icon mr-3">
                        <span class="icon-map-o"></span>
                      </div>
                      <p>
                        <span>Address:</span> Chisinau , Republic of Moldova
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="border w-100 p-4 rounded mb-2 d-flex">
                      <div class="icon mr-3">
                        <span class="icon-mobile-phone"></span>
                      </div>
                      <p>
                        <span>Phone:</span>{" "}
                        <a
                          style={{ textDecoration: "none" }}
                          href="tel://1234567920"
                        >
                          + 1235 2355 98
                        </a>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="border w-100 p-4 rounded mb-2 d-flex">
                      <div class="icon mr-3">
                        <span class="icon-envelope-o"></span>
                      </div>
                      <p>
                        <span>Email:</span>{" "}
                        <a
                          style={{ textDecoration: "none" }}
                          href="mailto:info@yoursite.com"
                        >
                          labc@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8 block-9 mb-md-5">
                <form class="bg-light p-5 contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="7"
                      className="form-control"
                      placeholder="Message"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Send Message"
                      className="btn btn-primary py-3 px-5"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Table partners={contacts} />
      </div>
    </>
  );
};

export default Contact;
