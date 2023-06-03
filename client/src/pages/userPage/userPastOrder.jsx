import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import UserHeadComponent from "../../component/UserHead/UserHead";
import AdvComponent from "../../component/adv/adv";
import MoreinfoComponent from "../../component/moreinfo/moreinfo";
import FooterComponent from "../../component/Footer/Footer";
import { Axios } from "axios";

function userPastOrder() {

    const [order, setOrder] = useState([])
    const [error, setError] = useState({})




    useEffect(() =>{
        const url = `${process.env.REACT_APP_API_BASE_URL}${GET_ORDER_URL}`
        Axios
        .get(url)
        .then((Response)=>{
            setOrder(Response.data)
            setError({ ...error, fetch_product: "" });
        })
        .catch((errorResponse)=>{
            setError({ ...error, fetch_product: errorResponse })
        })
    }, [])

return(
    <div>
    <div>
      <UserHeadComponent />
    </div>

    <div>
      <Link>
        <button>Create An Order</button>
      </Link>
    </div>
    <br />


{/* show the past order */}

<ul>
    <li>OrderId</li>
    <li>Date of Order</li>
    <li>Total Quantity</li>
    <li>Total Price</li>
    <li>Order Confirmrd(order status) <span>X</span></li>
</ul>





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
)



}


export default userPastOrder;



