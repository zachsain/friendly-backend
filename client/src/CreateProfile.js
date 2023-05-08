import React, { useEffect, useState }  from 'react'
import Signup from "./SignupForm";
import { db, auth, storage } from "./firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import './SignupForm.css'

function CreateProfile() {

    const [userList, setUserList] = useState([])
    const userCollectionRef = collection(db, 'users')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await getDocs(userCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                }))
                setUserList(filteredData)
            } catch (err) {
                console.error(err)
            }
        }
        getUserList()
    }, [])

    console.log(userList)

let name;

userList.map((u) => {
    name = u.firstName
})

const handleCreateProfile = async (event) => {
    event.preventDefault();
    try{
        await addDoc(userCollectionRef, {
            firstName: firstName, 
            lastName: lastName,
            email: email
        })
    } catch (err){
        console.error(err)
    }
   
}
  return (
    <div>

    <div className="signup-container">
      <form className="signup-form">
        <h2 className="signup-heading">Sign up</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signup-input"
        />
        <input
          type="bio"
          placeholder="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="signup-input"
        />
        <button onClick={handleCreateProfile} type="submit" className="signup-button">
          Sign up
        </button>
      </form>
    </div>
    <h1>{name}</h1>
    </div>
  )
}

export default CreateProfile