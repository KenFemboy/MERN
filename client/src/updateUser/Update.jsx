import React,{useEffect, useState} from 'react'
import  "./update.css"
import {Link , useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'
const UpdateUser = () => {
    const users = {
        name:"",
        email:"",
        };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const {id} = useParams();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setUser({...user,[name]:value});
        
    };
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[id]);

    const submitForm = async(e) => {
        e.preventDefault();
        await axios
            .put(`http://localhost:8000/api/update/user/${id}`,user)
            .then((response)=>{
                toast.success(response.data.message,{position:"top-center"})
                navigate("/");
            })
            .catch((error) =>{
                console.log(error);
            }); 
    }
  return (
    <div className='addUser'>
        <Link to="/" class="btn btn-secondary">Back</Link>
        <h3>Update User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    id="name"
                    value={user.name}
                    name='name'
                    onChange={inputHandler}
                    autoComplete='off'
                    placeholder='Enter Your Name'
                    />

            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id="email"
                    value={user.email}
                    name="email"
                    onChange={inputHandler}
                    autoComplete='off'
                    placeholder='Enter Your Email'
                    />
            </div>
            
            <div className="inputGroup">
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default UpdateUser;