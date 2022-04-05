import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//images
import image1 from "../assets/bg_1.jpg";
import image2 from "../assets/bg_5.jpeg";
import image3 from "../assets/bg_6.jpeg";
import image4 from "../assets/bg_7.jpeg";

//actions
import { fetchPartners } from "../redux/actions/partners";

//components
import ListPartners from "../components/ListPartners/ListPartners";

const Home = () => {
  //fetchPartners
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPartners());
  }, []);

  const latestPartners = useSelector((state) => state.partners.latestPartners);
  

  const imgArray = [image1, image2, image3, image4];
  const [state, setState] = useState({ img: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.img === 3) {
        setState((prev) => ({
          ...prev,
          img: 0,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          img: state.img + 1,
        }));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [state.img]);

  return (
    <div>
      <div
        className="hero-wrap ftco-degree-bg"
        style={{
          backgroundImage: `url(${imgArray[state.img]})`,
          // backgroundSize: "cover",
          backgroundPosition: "center",
          // overflow: "hidden",
          zIndex: -999,
        }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
            <div className="text-white">
              {/* <div className="col-lg-8 "> */}
              <div className="text w-100 text-center mb-md-5 pb-md-5">
                <h1
                  className="mb-4"
                  style={{ fontSize: "52px", color: "white" }}
                >
                  L <span className="navbar-logo">ABC</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "10%" }}>
        <ListPartners latestPartners={latestPartners} />
      </div>
    </div>
  );
};

export default Home;
