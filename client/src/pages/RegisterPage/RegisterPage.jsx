import React from "react";
import "./RegisterPage.css";
import NavbarComponent from "../../component/Navbar/Navbar";
import AdvComponent from "../../component/adv/adv";
import MoreinfoComponent from "../../component/moreinfo/moreinfo";
import FooterComponent from "../../component/Footer/Footer";
import RegisterFormComponent from "../../component/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <div className="registercontainer">
        <div className="navbar">
          <NavbarComponent/>
        </div>
        <div className="login">
        <RegisterFormComponent/>
        </div>
        <div className="adv">
          <AdvComponent />
        </div>
        <div className="moreinfo">
          <MoreinfoComponent />
        </div>
        <div className="footer">
          <FooterComponent />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
