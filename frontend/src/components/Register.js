import React, { useState } from 'react';
import '../App.css';
import Alert from 'react-bootstrap/Alert';
import axiosInstance from '../axios'
import { useNavigate, Navigate } from 'react-router-dom';

function Register(){

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit= (e) => {
        e.preventDefault();
        if(password1==password2){
            e.preventDefault()
            axiosInstance.post(`user/create/`,{
                username: username,
                password: password1,
            })
            .then((res) => {
                navigate('/login');
                console.log(res);
                console.log(res.data);
            })
        }else{
            setInvalidPassword(true)
        }
      }


    if (localStorage.getItem("access_token") === null) {
    return(
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card md-white text-dark" style={{"borderRadius": "1rem"}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-1 mt-md-1 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-dark-50 mb-3">Please enter a valid username and password!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline form-white mb-2">
                            <input required={true} type="text" onChange={e => setUsername(e.target.value)} id="typeUserX" className="form-control form-control-lg" />
                            <label className="form-label">Username</label>
                        </div>

                        <div className="form-outline form-white mb-2">
                            <input required={true} type="password" onChange={e => setPassword1(e.target.value)} id="typePasswordX1" className="form-control form-control-lg" />
                            <label className="form-label">Password</label>
                        </div>

                        <div className="form-outline form-white mb-2">
                            <input required={true} type="password" onChange={e => setPassword2(e.target.value)} id="typePasswordX2" className="form-control form-control-lg" />
                            <label className="form-label">Confirm your password</label>
                        </div>

                        <button id="submit" className="btn btn-outline-light btn-lg px-5 mb-4" type="submit">Register</button>

                        {invalidPassword && 
                            <div>
                                <Alert key="danger" variant="danger">
                                    Those passwords didn’t match. Try again.
                                </Alert>
                            </div>
                        }
                    </form>
                    </div>

                </div>
                </div>
            </div>
            </div>
        </div>
    )}
    return (
        <Navigate to='/' />
      )
}

export default Register;