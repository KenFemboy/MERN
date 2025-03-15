import React, { useEffect, useState } from 'react'
import "./user.css"
import axios from "axios"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const User = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async()=>{
            try {
                const response = await axios.get("https://mern-test-website.onrender.com/api/users");
                setUsers(response.data)
            } catch (error) {
                console.log("Error while fetching data", error)
            }
        };
        fetchData()
    }, []);

    const deleteUser = async (userId)=>{
        await axios.delete(`https://mern-test-website.onrender.com/api/delete/user/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user) => user._id !== userId))
            
        toast.success(response.data.message,{position:"top-center"})
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div className='userTable'>
        <Link to="/add" type="button" class="btn btn-primary">
            Add User <i class="fa-solid fa-user-plus"></i>
        </Link>
        {users.length===0?(
            <div className='noData'>
                <h3>Database Empty</h3>
                <p>Add new Users!!</p>
            </div>
        ):(
            <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>S. No.</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) =>{
                    return(
                <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='actionButtons'>
                        <Link to={'/update/'+user._id} type="button" class="btn btn-info">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button onClick={()=> deleteUser(user._id)} type="button" class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                        </button>

                    </td>
                </tr>
                    )
                })}
                
            </tbody>
        </table>
        )}
        

    </div>
  )
}

export default User