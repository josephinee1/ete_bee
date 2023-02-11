
import './index.css';
// import err_img from './../../assets/images/err.jpg';
import ErrorCard from '../../atom/errorCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Err=(props)=>{
    const navigate = useNavigate();
    useEffect(() => {
        if (props.LoggedInStatus === true) {
          navigate("/log");
        }
        else {
            navigate("/")
        }
      }, []);

      function check()
      {
        props.logoutUser();
        navigate("/")
      }

return (
    <>
    <ErrorCard 
        errorDisplay={props.errorDisplay}
        errorIcon={props.errorIcon}
        errorText={props.errorText}
        errorColor={props.errorColor}

    />
    <div className='err__outer'>
        <div className='err__inner__head'style={{marginBottom:"32rem"}}>
            LoggedIn
        </div>
        <div className='err__inner__button' style={{marginTop:"28rem"}} onClick={()=>{check()}}>
            LogOut
        </div>
        <div className='err__inner'>
        </div>
    </div>
    </>
);
}

export default Err;