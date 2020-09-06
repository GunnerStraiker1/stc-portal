import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";
// import { useSelector, useDispatch } from "react-redux";
// import * as Selector from "../../redux/selectors/rootSelectors";
// import { useEffect } from "react";
// import { verifyToken, refreshToken } from "../../redux/actions/userActions";
// import SideBar from "../sidebar/sidebar";

const PrivateRoute = ({ component: Component, logged, stillLogged, ...rest }) => {

  const token = localStorage.getItem('token')
  // const [logged, setLogged] = useState(false)

  useEffect(() =>{
    if(token !== null && token !== undefined){
      stillLogged(true)
    }
    else{
      stillLogged(false)
    }
  },[])

  // console.log(logged)
  // console.log(isValid)

  // const verifyTokenTrue = async () =>{
  //   dispatch(verifyToken(token))
  //   if(!isValid){
  //     dispatch(refreshToken(tokenRefresh))
  //   }
  // }

  // console.log(token)

//   useEffect(()=>{
//     if(token !== "" && token !== null ) verifyTokenTrue()
// },[isValid])

  return (
    <Route
      {...rest}
      render={(props) =>
        logged ? (
          <div>
            {/* <SideBar /> */}
            <NavbarAdmin />
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default PrivateRoute
