import React from "react";
import { Link } from "react-router-dom";
import "./UserHead.css";



const UserHeadComponent = () => {
  return (
    <>
      <div className="navcont">
        <div>
          <span>LAUNDRY</span>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link id="li">Home</Link>
              </li>
              <li>
                <Link id="li">Pricing</Link>
              </li>
              <li>
                <Link id="li">Career</Link>
              </li>
              <li>
                <Link id="li">userinfo</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UserHeadComponent ;
