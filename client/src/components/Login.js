import React, { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  })

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const login = (event) => {
    event.preventDefault()
    Axios.post('http://localhost:5000/api/login', credentials)
      .then((response) => {
        console.log("This is response from axios post for login:", response)
        localStorage.setItem('token', response.data.payload)
      })
      .catch((error) => {
        console.log("This is an error on login:", error.message)
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={login}>
          <label> Username:
            <input
            name="username"
            placeholder="Enter Username"
            value={credentials.username}
            onChange={handleChange}
            />
          </label>
          <label> Password:
            <input
            name="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
