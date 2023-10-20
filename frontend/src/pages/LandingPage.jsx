import { Button } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo){
            navigate('/mynotes');
        }
    },[])
  return (
    <div className='main'>
        <div className="container">
            <div className="row">
                <div className="intoText w-100 text-center">
                    <h3 className=" h1 display-5" style={{fontWeight:'bold'}}>Welcome to  Note <br /> Zipper</h3>
                    <p className=''>One safe palce for all your notes</p>
                    <div className="buttonContainer d-flex flex-md-row flex-sm-column">
                        <Link to = "/login"><Button className="landingbutton mb-3" >LOGIN IN</Button></Link>
                        <Link to= "/register"><Button className="landingbutton" variant='outline-primary' >Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage