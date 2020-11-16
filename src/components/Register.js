import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  })
  const {email, password, name} = inputs
 
  
  const onChange = (e) => {
    setInputs({...inputs,[e.target.name]: e.target.value});
  }

  const onSubmitForm = async e => {
      e.preventDefault();
      try {
          const body = {email, password, name};
          const response = await fetch('http://localhost:5100/auth/register',{
              method: "POST",
              headers: {
                  "Content-type" : "application/json"
              },
              body: JSON.stringify(body)
          });
          const parseRes = await response.json()

          localStorage.setItem("token", parseRes.token)
          props.setAuth(true)
          
      } catch (err) {
          console.error(err.message);
          
      }
  }
  return (
      <Fragment>
    <div className='container'>
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='email'
          name='email'
          className='form-control my-3'
          placeholder='email'
          value={email}
          onChange={e=> onChange(e)}
        />
        <input
          type='password'
          name='password'
          className='form-control my-3'
          placeholder='password'
          value={password}
          onChange={e=> onChange(e)}
        />
        <input
          type='text'
          name='name'
          className='form-control my-3'
          placeholder='name'
          value={name}
          onChange={e=> onChange(e)}
        />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
    </Fragment>
  )
}

export default Register
