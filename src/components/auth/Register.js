import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '../../Firebase'
import { toast } from 'react-toastify'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
const RegisterFB = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [contact,setContact]=useState("")
    const [load,setLoad]=useState(false)
    const nav=useNavigate()
    const handleForm=(e)=>{
        e.preventDefault()
        setLoad(true)
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredentials) => {
                console.log(userCredentials.user.uid)
                let userId = userCredentials.user.uid
                saveData(userId)
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error(error.message)
                setLoad(false)
            }
        )
    }
    const saveData=async (userId)=>{
      try{
        let data={
          name:name,
          contact:contact,
          email:email,
          address:address,
          userId:userId,
          userType:2,
          status:true,
          createdAt:Timestamp.now()
        }
        await setDoc(doc(db,"users",userId),data)
        sessionStorage.setItem("name",data.name)
        sessionStorage.setItem("userId",userId)
        sessionStorage.setItem("userType",data.userType)
        sessionStorage.setItem("email",data.email)
        sessionStorage.setItem("contact",data.contact)
        toast.success("User Registerd.")
        nav("/")
      }
      catch(err){
        toast.error("somthing went wrong...")
      }
      setTimeout(() => {
        setLoad(false)
      }, 1500);
    }
    const googleSignUp=()=>{
      setLoad(true)
        let googleProvider = new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider)
        .then((userCredentials)=>{
            console.log(userCredentials)
        })
        .catch((error)=>{
            toast.error(error.message)
        })
        setTimeout(() => {
          setLoad(false)
        }, 1500);
    }
  return (
 <>
  <div className="slider-area slider-area2">
    <div className="slider-active dot-style">
      {/* Slider Single */}
      <div className="single-slider  d-flex align-items-center slider-height2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-8 col-md-10 ">
              <div className="hero-wrapper">
                <div className="hero__caption">
                  <h1 data-animation="fadeInUp" data-delay=".3s">
                    Register with firebase
                  </h1>
                  <p data-animation="fadeInUp" data-delay=".6s">
                    Let's Get Connect with
                    <br /> health coach
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
      <div className={load==true?"d-none":"container "}>
        <form onSubmit={handleForm} className="form-contact contact_form mb-5" >
          <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-8 col-sm-12 border-25 border-success shadow pt-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="Enter your Name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                            <input className="form-control"type="email"placeholder="Enter email address" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <input className="form-control" type="password" placeholder="Enter your Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <input className="form-control" type="text" placeholder="Contact Number" value={contact} onChange={(e)=>{setContact(e.target.value)}} required pattern='[0-9]{10}' title='Enter valid contact'/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <input className="form-control" type="text" placeholder="Enter your Address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="d-block mx-auto button button-contactForm boxed-btn">Sign Up</button>
                    </div>
                    <div className="mt-2">
                        <button className="boxed-btn d-block mx-auto" onClick={googleSignUp}>Sign Up with Google</button>
                    </div>
                    <div className='text-center my-2'>
                    <Link className='text-primary d-block my-2' style={{fontSize:"1.5rem"}} to={"/login"}>Already have an Account? Login</Link>
                    <Link to={"/"} className='text-primary d-block my-2' style={{fontSize:"1.5rem"}}>Back to Home</Link>
                    </div>
                </div>
            </div>
          </div>
        </form>
      </div>
 </>
  )
}

export default RegisterFB
