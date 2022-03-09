import React, { useState } from 'react';
import '../App.css';
import axiosInstance from '../axios'
import Alert from 'react-bootstrap/Alert';
import { useNavigate, Navigate } from 'react-router-dom';

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    const navigate = useNavigate();
    
    function handleSubmit(e){
        e.preventDefault()    
        axiosInstance.post(`token/obtain/`,{
            username: username,
            password: password,
        })
        .then((res) => {
            localStorage.setItem('user', username)
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            navigate('/')
        }).catch(function(error){
            setInvalidLogin(true)
        })

      }
    if (localStorage.getItem("access_token") === null) { 
    return(
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-white text-dark" style={{"borderRadius": "1rem"}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h1 className="fw-bold mb-3 text"> Tasker </h1>
                    <h3 className="fw mb-2 text-uppercase">Login</h3>
                    <p className="text-dark-50 mb-5">Please enter your username and password!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline form-white mb-4">
                            <input type="text" onChange={e => setUsername(e.target.value)} name="username" id="typeUserX" className="form-control form-control-lg" />
                            <label className="form-label">Username</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                            <input type="password" name="password" onChange={e => setPassword(e.target.value)} id="typePasswordX" className="form-control form-control-lg" />
                            <label className="form-label">Password</label>
                        </div>

                        <button id="submit" className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                    </form>
                    </div>
                    
                    <div>
                    <p className="mb-0">Don't have an account? <a href="/register" className="text-dark-50 fw-bold">Sign Up</a></p>
                    </div>
                        {invalidLogin && 
                            <div >
                                <Alert key="danger" variant="danger">
                                    Username or password are incorrect. Please try again.
                                </Alert>
                            </div>
                        }
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

export default Login;