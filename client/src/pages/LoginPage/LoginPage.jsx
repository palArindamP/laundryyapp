import React from "react";
import NavbarComponent from "../../component/Navbar/Navbar";
import AdvComponent from "../../component/adv/adv";
import MoreinfoComponent from "../../component/moreinfo/moreinfo";
import FooterComponent from "../../component/Footer/Footer";
import LoginFormComponent from "../../component/LoginForm/LoginForm";


const LoginPage = () => {
  return (
    <>
      <div className="logincontainer">
        <div className="navbar">
          <NavbarComponent />
        </div>
        <div className="login">
          <LoginFormComponent/>
        </div>
        <div className="adv">
            <AdvComponent/>
        </div>
        <div className="moreinfo">
           <MoreinfoComponent/>
        </div>
        <div className="footer">
            <FooterComponent/>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
