import React from "react";

import { useSelector, useDispatch } from "react-redux";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletePartner } from "../../redux/actions/partners";

const ListPartners = ({ latestPartners, onEdit, admin }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user?.token);
  return (
    <div class="container">
      <div class="row">
        {latestPartners?.map((partner) => (
          <li class="col-md-6 col-lg-4 " style={{ listStyle: "none" }}>
            <div class="car-wrap rounded ">
              <div
                class="img rounded d-flex align-items-end"
                style={{
                  backgroundImage: `url(${`${partner?.partnerImage}`})`,
                }}
              ></div>
              <div class="text">
                <h2 class="mb-0">
                  <a>{partner.name}</a>
                </h2>
                <div class=" mb-3">
                  <p class="price ml-auto">{partner?.email}</p>
                  <p class="price ml-auto">{partner?.description}</p>
                </div>

                {token && admin && (
                  <p class="d-flex mb-0 d-block">
                    <button
                      class="btn btn-danger py-2 mr-1 text-white"
                      onClick={() => dispatch(deletePartner(partner._id))}
                    >
                      Delete
                    </button>

                    <button
                      class="btn btn-secondary py-2 ml-1"
                      onClick={onEdit.bind(this, partner._id)}
                    >
                      <span>Edit</span>
                    </button>
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ListPartners;
