import './index.css';
import Axios from 'axios'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from './../navbar/index';
import ErrorCard from '../../atom/errorCard';


const Auth=(props)=> {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.LoggedInStatus === true) {
      navigate("/log");
    }
    else {
        navigate("/")
    }
  }, []);


  
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")

  const [emailLogin,setEmailLogin]=useState("")
  const [passLogin,setPassLogin]=useState("")

  function signUpClicked()
  {
    let nameCheck=/^[A-Z a-z]+$/;
    if(nameCheck.test(name)===false)
    {
      props.showError("fill name correctly!!","error")
      return;
    }
    var emailCheck=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailCheck.test(email)===false)
    {
      props.showError("Email is incorrect","error");
        return;
    }
    else if(pass==="")
    {
      props.showError("fill pass correctly!!","error")
      return;
    }
    Axios.post('http://localhost:5000/api/post/sign-up',
    {
      name:name,
      email:email,
      pass:pass
    }).then((res)=>{
      if(res.data.message==="createdSuccess")
      {
        props.showError("Account Created Successfully!!!","success")
        console.log(res.data.data)
        props.LoggedInStatusCheck(true,res.data.data)
        navigate("/log")

      }
      else if(res.data.message==="alreadyExist")
      {
        props.showError("Account Already Exists Please Login!!!","info")
      }
      document.getElementById("nameSignup").value="";
      document.getElementById("emailSignup").value="";
      document.getElementById("passSignup").value="";
      
      // document.getElementById("checkTest").;
    });
  }




  function signInClicked()
  {
    if(emailLogin==="" || passLogin==="")
    {
      props.showError("Email Or Password is Incorrect!!","error");
        return;
    }
    Axios.post('http://localhost:5000/api/post/sign-in',
    {
      email:emailLogin,
      pass:passLogin
    }).then((res)=>{
      if(res.data.message==="loginSuccess")
      {
        props.showError("Login Successful!!!","success")
        console.log(res)
        props.LoggedInStatusCheck(true,res.data.data)
        navigate("/log")
        document.getElementById("emailLogin").value="";
        document.getElementById("passLogin").value="";
      }
      else if(res.data.message==="loginFailed")
      {
        props.showError("Email or Password Incorrect","error")
      }
      
      // document.getElementById("checkTest").;
    });
  }
  


  return (
    <>
    <ErrorCard 
      errorDisplay={props.errorDisplay}
      errorIcon={props.errorIcon}
      errorText={props.errorText}
      errorColor={props.errorColor}

      />
    {/* <Navbar/> */}
    <div className='outer__auth'>
      <div className="inner__auth">
        <div className="main__auth" data-aos="fade-up">  	
          <input type="checkbox" id="chk" aria-hidden="true"/>
          <div className="signup">
            <form>
              <label id="checkTest" for="chk" aria-hidden="true">SIGN UP</label>
              <input onChange={(e)=>{setName(e.target.value)}} id="nameSignup" type="text" name="txt" placeholder="Name" required="required"/>
              <input onChange={(e)=>{setEmail(e.target.value)}} id="emailSignup" type="email" name="email" placeholder="Email" required="required"/>
              <input onChange={(e)=>{setPass(e.target.value)}} id="passSignup" type="password" name="pswd" placeholder="Password" required="required"/>
              <button type="button" onClick={()=>{signUpClicked()}}>SIGN UP</button>
            </form>
          </div>

          <div className="login">
            <form>
              <label for="chk" aria-hidden="true">SIGN IN</label>
              <input onChange={(e)=>{setEmailLogin(e.target.value)}} id="emailLogin" type="email" name="email" placeholder="Email" required="required"/>
              <input onChange={(e)=>{setPassLogin(e.target.value)}} id="passLogin" type="password" name="pswd" placeholder="Password" required="required"/>
              <button type="button" onClick={()=>{signInClicked()}}>SIGN IN</button>
            </form>
          </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default Auth;