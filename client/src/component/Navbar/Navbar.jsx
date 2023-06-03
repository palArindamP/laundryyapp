import React, { useEffect, useState } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import "./Navbar.css";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth) setUser(JSON.parse(auth));
  }, []);

  function handleLogout() {
    sessionStorage.clear();
  }

  return (
    <>
      <div className="navcont">
        <div>
          <span>LAUNDRY</span>
        </div>
        <div>
          <nav>
            <ul>
              {user && user.id ? (
                <>
                  <li>
                    <Link id="li" to={"/make-order"}>
                      Create order
                    </Link>
                  </li>
                  <li>
                    <Link id="li" to={"/view-order"}>
                      View order
                    </Link>
                  </li>
                  <li>
                    <Link id="li" onClick={handleLogout} to={"/"}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link id="li" to={"/"}>
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;