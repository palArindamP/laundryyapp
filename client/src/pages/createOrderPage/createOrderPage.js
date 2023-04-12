// import React, { useState } from "react";
// import "./createOrderPage.css";
// import Navbar from "../../component/Navbar/Navbar"
// import { Link } from "react-router-dom"

// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
// import MinimizeIcon from '@mui/icons-material/Minimize';
// import CheckIcon from '@mui/icons-material/Check';
// import SearchIcon from '@mui/icons-material/Search';

// export default function CreateOrderPage() {
//   // let [count, setCount] = useState(1)
//   // const [modalIsOpenA, setIsOpenA] = React.useState(false);
//   // const [modalIsOpen, setIsOpen] = React.useState(false);

//   // const handle = (event) => {
//   //   setCount(count + 1);
//   //   console.log(count);
//   // }

//   // const hanleConfirm = (e) => {
//   //   setIsOpen(true);
//   // }
//   // const hanleConfirmA = (e) => {
//   //   setIsOpenA(true);
//   // }

// let countHs = 0;
//   const [shirtCount, setShirtCount] = useState(0)
//   const [singleS, setsingleS] = useState(0)
//   const [shirtPrice, setShirtPrice] = useState(0)

//   let countHp = 0;
//   const [panttCount, setPantCount] = useState(0)
//   const [singleP, setsingleP] = useState(0)
//   const [pantPrice, setPantPrice] = useState(0)


//   const [totalItem, setTotalItem] = useState(0)



//   function qShirt(e){
//     let ishirt = e.target.value
//     setShirtCount(ishirt)
//     // setTotalItem(totalItem + ishirt)
//   }

//   function handleWs(){
//     // count = count + 1
//     setsingleS(singleS + 40) 
//     setShirtPrice((parseInt(singleS ) + 40) * parseInt(shirtCount))
//   }

//   function handleDs(){
   
//     setsingleS(singleS + 30) 
//     setShirtPrice((parseInt(singleS ) + 30) * parseInt(shirtCount))
//   }

//   function handleIs(){
   
//     setsingleS(singleS + 20) 
//     setShirtPrice((parseInt(singleS ) + 20) * parseInt(shirtCount))
//   }

//   function handleHs(){
//     countHs =  1
//     setsingleS(singleS + 10) 
//     setShirtPrice((parseInt(singleS ) + 10) * parseInt(shirtCount))
//   }

//   function resetS(){
//     setShirtCount(0)
//     setsingleS(0)
//     setShirtPrice(0)

//   }

//   return (
//     <>
//       <Navbar />
//       <div id="create-order-top">
//         <div style={{ fontWeight: "bolder", fontSize: "40px" }}>Create Order</div>
//         <div id="right">
         
//           <input type="text" placeholder="search" />
//         </div>
//       </div>
//       <br /><br /><br />
//       <div id="createorder-titlehead">
//         <ul>
//           <li style={{alignItems: "center"}}>Product types</li>
//           <li style={{alignItems: "center"}}>Quantity</li>
//           <li style={{alignItems: "center"}}>Wash</li>
//           <li style={{alignItems: "center"}}>Dry-Wash</li>
//           <li style={{alignItems: "center"}}>Iron</li>
//           <li style={{alignItems: "center"}}>Hang</li>
//           <li style={{alignItems: "center"}}>For an Item</li>
//           <li style={{alignItems: "center"}}>Price</li>
//           <li style={{alignItems: "center"}}>.</li>
//         </ul>

//         <div className="order-childCards">
//           <ul>
//             <li style={{margin: "justify"}}>Shirt</li>
//             <li style={{alignItems: "center"}}><input placeholder="0" type="Number"   onChange={qShirt} value={shirtCount}/></li>
//             <li style={{alignItems: "center"}}><button onClick={handleWs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleDs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleIs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}  ><button onClick={handleHs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}} >{singleS}</li>
//             <li style={{alignItems: "center"}}>{shirtPrice}</li>
//             <li><button onClick={resetS}>Reset</button></li>
//           </ul>
//         </div>

//         <div className="order-childCards">
//           <ul>
//           <li style={{margin: "justify"}}>Pant</li>
//             <li style={{alignItems: "center"}}><input placeholder="0" type="Number"   onChange={qPant} value={shirtCount}/></li>
//             <li style={{alignItems: "center"}}><button onClick={handleWp} disabled={countHp !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleDp} disabled={countHp !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleIp} disabled={countHp !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}} ><button onClick={handleHp} disabled={countHp !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}} >{singleS}</li>
//             <li style={{alignItems: "center"}}>{shirtPrice}</li>
//             <li><button onClick={resetP}>Reset</button></li>
//           </ul>
//         </div>

//         <div className="order-childCards">
//           <ul>
//           <li style={{margin: "justify"}}>T-Shirt</li>
//             <li style={{alignItems: "center"}}><input placeholder="0" type="Number"   onChange={qShirt} value={shirtCount}/></li>
//             <li style={{alignItems: "center"}}><button onClick={handleWt} disabled={countHt !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleDt} disabled={countHt !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleIt} disabled={countHt !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}  ><button onClick={handleHt} disabled={countHt !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}} >{singleT}</li>
//             <li style={{alignItems: "center"}}>{pantPrice}</li>
//             <li><button onClick={resetT}>Reset</button></li>
//           </ul>
//         </div>

//         <div className="order-childCards">
//           <ul>
//           <li style={{margin: "justify"}}>Trouser</li>
//             <li style={{alignItems: "center"}}><input placeholder="0" type="Number"   onChange={qShirt} value={shirtCount}/></li>
//             <li style={{alignItems: "center"}}><button onClick={handleWs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleDs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleIs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}  ><button onClick={handleHs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}} >{singleS}</li>
//             <li style={{alignItems: "center"}}>{shirtPrice}</li>
//             <li><button onClick={resetS}>Reset</button></li>
//           </ul>
//         </div>

       
//         <div className="order-childCards">
//           <ul>
//           <li style={{margin: "justify"}}>Others</li>
//             <li style={{alignItems: "center"}}><input placeholder="0" type="Number"   onChange={qShirt} value={shirtCount}/></li>
//             <li style={{alignItems: "center"}}><button onClick={handleWs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleDs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}><button onClick={handleIs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}}  ><button onClick={handleHs} disabled={countHs !== 0 ? true : false}><MinimizeIcon /></button></li>
//             <li style={{alignItems: "center"}} >{singleS}</li>
//             <li style={{alignItems: "center"}}>{shirtPrice}</li>
//             <li><button onClick={resetS}>Reset</button></li>
//           </ul>
//         </div>


//         <div id="proceed-container" style={{marginLeft: "1300px"}}>
//           <button style={{ color: "white", backgroundColor: "#5861AE" }}>
//             Proceed
//           </button>
//           <button style={{ color: "#5861AE", marginLeft: "30px" }}>Cancel</button>
//         </div>
//       </div>
      
//       <div >
//       <p style={{ color: "white", backgroundColor: "#5861AE", marginLeft:"10px", padding: "10px"}}>
//             Total Item: <span >{totalItem}</span>
//           </p>
//           <p style={{ color: "white", backgroundColor: "#5861AE", marginLeft:"10px", padding: "10px" }}>
//             Total Price: <span value={0}></span>
//           </p>
//       </div>


//     </>
//   );
// }
export default<></>