import React from "react";
import { Link } from "react-router-dom";
import UserHeadComponent from "../../component/UserHead/UserHead";
import AdvComponent from "../../component/adv";
import MoreinfoComponent from "../../component/moreinfo/moreinfo";
import FooterComponent from "../../component/Footer/Footer";

function userCreateOrder() {
  return (
    <div>
      <div>
        <UserHeadComponent />
      </div>
      <div>
        <Link><button>View My Past Orders</button></Link>
      </div>

      <div>
        <Link to="make-order">
          <button>Create An Order</button>
        </Link>
      </div>
      <br />

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
  );
}

export default userCreateOrder;
