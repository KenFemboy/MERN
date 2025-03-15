import React,{useState} from 'react'
import  "./AddUser.css"
import {Link , useNavigate} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'
const AddUser = () => {
    const users = {
        name:"",
        email:"",
        };

    const [user, setUser] = useState(users)
    const navigate = useNavigate()


    const inputHandler = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setUser({...user,[name]:value});
        
    };
    const submitForm = async(e) => {
        e.preventDefault();
        await axios
            .post("https://mern-test-website.onrender.com/api/user",user)
            .then((response)=>{
                // console.log("User created successfully");
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
        <h3>Add new User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    id="name"
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

export default AddUser