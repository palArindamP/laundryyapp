import React, { useState } from "react";
import "./createOrderCard.css";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CheckIcon from '@mui/icons-material/Check';

export default function CreateOrderCard(props) {
  // const [qty, setQty] = useState(0);



  return (
    <>
      {/* <div id="createOrderCard-container"> */}
        {/* <div> */}
          {/* <img
            src={`http://localhost:4000/order//pics/${props.filename}`}
            alt="logo"
          /> */}
          {/* {props.productName} */}
          {/* Shirt */}
        {/* </div> */}
        {/* <div> */}
          {/* <input
            id="inp-qty"
            type="text"
            onChange={(e) => {
              setQty((prev) => {
                return e.target.value;
              });
            }}
            value={qty}
          /> */}
        {/* </div> */}
        {/* <div id="ops-container">
          <img src="/washing-machine.svg" alt="washing-machine" />
          <img src="/ironing.svg" alt="ironing" />
          <img src="/towel.svg" alt="towel" />
          <img src="/bleach.svg" alt="bleach" />
        </div> */}
        {/* <div>{price}250</div> */}
      {/* </div> */}
<div style={{display:"flex", backgroundColor:"black", color: "white"}}>
  <div>Items</div>
  <div><span>Wash</span><span>Dry-wash</span><span>Iron</span><span>Hang</span></div>
  <div>Total</div>
</div>
<div>
  <div><RadioButtonCheckedIcon/></div>
  <div>Shirt</div>
  <div><span><MinimizeIcon/></span><span><MinimizeIcon/></span><span><MinimizeIcon/></span><span><MinimizeIcon/></span></div>

</div>


    </>
  );
}
