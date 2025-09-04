import React, { useState } from 'react';
import instance from '../utils/axiosConfig';
import { useNavigate } from 'react-router';

function fetchSignup(formData) {
  instance.post("/accounts/signup/", formData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

// function validation(formData) {
//   let status = {
//     passed: false,
//     message: "",
//     target: null
//   }

//   if (formData.username === "") {
//     status.target = "username";
//     status.message = "This field cannot be blank.";
//   } else if (formData.password1 === "") {

//   } else if (formData.password2 === "") {

//   } else if (formData.password1 !== formData.password2) {
    
//   }
  


//     return status;
//   }
// }

function Signup() {

  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_check: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // validation

    // fetch
    fetchSignup(formData);

    // signup successful -> redirect to login
    navigate("/login");

  }

  return (
    <div>
      <p>Signup</p>
      <form action="" method="post">
        <label></label>
        <input type="text" name="username" id="username" onChange={handleChange} value={formData.username} />
        <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} />
        <input type="password" name="password_check" id="password_check" onChange={handleChange} value={formData.password_check} />
        <button type="submit" onClick={handleSubmit}>가입</button>
      </form>
    </div>
  );
}

export default Signup;