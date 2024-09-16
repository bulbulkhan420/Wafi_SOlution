import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { TextField} from '@mui/material';
import './AddEmployee.css';
import axios from 'axios';


const Update = () => {
  const intialValue = {
    name: '',
    phone: '',
    email: '',
    dob: '',
  };
  let {email}=useParams();
 
  const navigate=useNavigate();
  const [formInput, setFormInput] = useState(intialValue);
  const [image,setImage]=useState();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };
  
  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    console.log(formInput);
      const formData = new FormData();
      formData.append('name',formInput.name);
      formData.append('phone',formInput.phone);
      formData.append('email',email);
      formData.append('dob',formInput.dob);
      formData.append('avatar',image);
      console.log(formData);
      console.log(image);
      axios.post('http://localhost:8002/edit',formData)
    .then((res)=>{
        if(res.data.ok){
            alert("update successfully");
            navigate('/');
            console.log(res);
        }
           
    })
    
    //toast('Employee Updated Successfull!')
    
     
  };

 return (
    <div className="add-employee">
      {/* <pre>{JSON.stringify(formInput, undefined, 2)}</pre> */}
      <div className="header ">
        <h1>Update employee information</h1>
      </div>
      <div className="form ">
        <form>
        <TextField
            type="text"
            label="Full name"
            id="in"
            name="name"
            value={formInput.name}
            onChange={handleChange}
          />
        
         
          <TextField
            type="text"
            label="Mobile number"
            placeholder='01*********'
            id="in"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
          />
         
          <TextField
          disabled
            type="text"
            label="Write email "
            id="in"
            name="email"
            value={email}
            onChange={handleChange}
          />
       
          <div className='date-of-birth'>
            <label htmlFor='date'>Date of Birth: </label>
            <input type='date'
                id='date'
                name='dob'
                value={formInput.dob}
                onChange={handleChange}
            />
          </div>

          <div className='image-upload'>
            <label htmlFor='image'>Upload image: </label>
            <input type='file'
                accept="image/*"
                id='image'
                name='avatar'
                onChange={handleFileChange}
                />
          </div>
          <div className="btn">
            <button type="submit" id="add" onClick={handleSubmit} >            Save cheanges
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;