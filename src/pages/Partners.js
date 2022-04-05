import React from "react";

import { useSelector } from "react-redux";

//components
import Section from "../components/Section/Section";
import Table from "../components/Pagination/Table";

//assets
import image1 from "../assets/bg_1.jpg";

const Partners = () => {
  const partners = useSelector((state) => state?.partners?.partners);
  return (
    <>
      <Section image={image1} page={"Partners"} name={"Our Partners"} />
      <section className="ftco-section" style={{ margin: "10%" }}>
        <Table partners={partners} />
      </section>
    </>
  );
};

export default Partners;
