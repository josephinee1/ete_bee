import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';
import Auth from './components/template/auth/index';
import Log from './components/template/err/index';
import { faTriangleExclamation,faCircleCheck,faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const App=(props)=> {
  AOS.init({
    offset: 100,
    duration: 1500,
    easing: 'ease-in-sine',
  });
  


  // globalStates
  const[LoggedIn,setLoggedIn]=useState("");
  const[LoggedInStatus,setLoggedInStatus]=useState(false);
  const[errorDisplay,setErrorDisplay]=useState("none")
  const[errorIcon,setErrorIcon]=useState()
  const[errorText,setErrorText]=useState("Error")
  const[errorColor,setErrorColor]=useState("red")


  function myStopFunction() 
  {
    setErrorDisplay("none");
  }

  function showError(message,type)
  {
    setErrorText(message)
    if(type==="success")
    {
      setErrorIcon(faCircleCheck);
      setErrorDisplay("flex");
      setErrorColor("green")
    }
    else if(type==="info")
    {
      setErrorIcon(faCircleInfo);
      setErrorDisplay("flex")
      setErrorColor("#FD9229")
    }
    else
    {
      setErrorIcon(faTriangleExclamation);
      setErrorDisplay("flex")
      setErrorColor("red")
    }
    setTimeout(myStopFunction, 4000);
  }



  function logoutUser()
  {
    setLoggedInStatus(false);
    setLoggedIn("");
    console.log("asuydbais")
  }

  function LoggedInStatusCheck(x,data)
  {
    setLoggedIn(data);
    setLoggedInStatus(x);
  }


  



  


  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={
          <Auth 
            LoggedIn={LoggedIn}
            LoggedInStatusCheck={LoggedInStatusCheck}
            LoggedInStatus={LoggedInStatus}

            showError={showError}
            errorDisplay={errorDisplay}
            errorIcon={errorIcon}
            errorText={errorText}
            errorColor={errorColor}
          />}>
        </Route>
        <Route path="/log" element={
          <Log 
            LoggedIn={LoggedIn}
            LoggedInStatusCheck={LoggedInStatusCheck}
            LoggedInStatus={LoggedInStatus}

            showError={showError}
            errorDisplay={errorDisplay}
            errorIcon={errorIcon}
            errorText={errorText}
            errorColor={errorColor}
            logoutUser={logoutUser}
          />}>
          </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
