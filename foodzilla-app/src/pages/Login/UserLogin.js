import React from 'react';
import './Login.css'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {

    const initData = {
        email: "",
        password: ""
    }
    const [data, setData] = useState(initData);
    const [signupdata, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });

    var IsEmail = (email) => {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@northeastern.edu/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    };
    var IsUsername = (uname) => {
        var regex = /^([a-zA-Z]+)$/;
        if (!regex.test(uname)) {
            return false;
        } else {
            return true;
        }
    };
    var IsPW = (password) => {
        var regex = /^[a-zA-Z0-9]\w{8,20}$/;
        if (!regex.test(password)) {
            return false;
        } else {
            return true;
        }
    }

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (data.email !== "" && data.password !== "") {
    //         fetch(`http://localhost:3001/user/get/${data.email}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         }).then(function (response) {
    //             return response.json();
    //         }).then(function (res) {
    //             if (res !== {} && res.password === data.password) {
    //                 setData(initData);
    //                 return navigate('/mainpage');
    //             } else {
    //                 alert("Invalid credentials...")
    //             }
    //         });
    //     }
    // }, [data]);

    // useEffect(() => {
    //     if (signupdata.email !== "" && signupdata.password !== "" && signupdata.name !== "") {
    //         if (IsEmail(signupdata.email) && IsUsername(signupdata.name) && IsPW(signupdata.password)) {
    //             fetch(`http://localhost:3001/user/create`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(signupdata),
    //             }).then(function (response) {
    //                 return response.json();
    //             }).then(function (res) {
    //                 alert("Successfully Signed Up")
    //             });
    //         } else {
    //             alert("Invalid credentials...")
    //         }
    //     }
    // }, [signupdata]);

    const btnclick = () => {
        document.querySelector('.cont').classList.toggle('s--signup');
    }

    const loginSubmit = () => {
        const username = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPw").value;
        const user = {
            email: username,
            password: password
        }
        setData(user);
        return navigate('/mainpage'); //remove after adding api call
    }

    const signupSubmit = () => {
        const user = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const pw = document.getElementById("signupPw").value;
        const data = {
            name: user,
            email: email,
            password: pw
        }
        setSignupData(data);
    }

    return (
        <div class="cont">
            <div class="form sign-in">
                <h2>Welcome back,</h2>
                <label>
                    <span>Email</span>
                    <input type="email" id="loginEmail" />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" id="loginPw" />
                </label>
                <p class="forgot-pass">Forgot password?</p>
                <button type="button" class="submit" onClick={() => loginSubmit()}>Sign In</button>
            </div>
            <div class="sub-cont">
                <div class="img">
                    <div class="img__text m--up">
                        <h2>New here?</h2>
                        <p>Sign up and discover great amount of new opportunities!</p>
                    </div>
                    <div class="img__text m--in">
                        <h2>One of us?</h2>
                        <p>If you already has an account, just sign in. We've missed you!</p>
                    </div>
                    <div class="img__btn" onClick={() => btnclick()}>
                        <span class="m--up">Sign Up</span>
                        <span class="m--in">Sign In</span>
                    </div>
                </div>
                <div class="form sign-up">
                    <h2>Time to feel like home,</h2>
                    <label>
                        <span>Name</span>
                        <input type="text" id="signupName" />
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="email" id="signupEmail" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" id="signupPw" />
                    </label>
                    <button type="button" class="submit" onClick={() => signupSubmit()}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;