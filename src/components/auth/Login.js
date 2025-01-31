import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [load,setLoad]=useState(false)
    const nav = useNavigate()
    let obj = {
      display:"block",
      margin: "0 auto"
    }

      const handleForm=(e)=>{
        e.preventDefault()
        setLoad(true)
        signInWithEmailAndPassword(auth,email,password)
        .then(async(userCredentials)=>{
          console.log(userCredentials)
          let userId=userCredentials.user.uid
          let docRef= doc(db,"users",userId)
          let data= await getDoc(docRef)
          if(data.exists()){
            let userData = data.data()
            if(userData.status){
              sessionStorage.setItem("name",userData.name)
              sessionStorage.setItem("userId",userId)
              sessionStorage.setItem("userType",userData.userType)
              sessionStorage.setItem("email",userData.email)
              sessionStorage.setItem("contact",userData.contact)
              if(userData.userType==1){
                nav("/admin")
              }
              else{
                nav("/")
              }
            }
            else{
              toast.error("Account Blocked by Admin.")
            }
          }
          else{
            console.log("no data found!")
           toast.error("No user data found")
          }
        })
        .catch((err)=>{
          console.log(err)
          toast.error(err.message)
        })  
        setTimeout(() => {
          setLoad(false)
        }, 1000);
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
                    Login
                  </h1>
                  <p data-animation="fadeInUp" data-delay=".6s">
                    Get in touch with
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
  {load==true?<MoonLoader color='blue' size={50} cssOverride={obj} loading={load} />:
  <>
    <form onSubmit={handleForm} className="form-contact contact_form mb-5" >
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-sm-12 border-25 border-success shadow pt-5">
               <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                        <input className="form-control"type="email"placeholder="Enter email address" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input className="form-control" type="password" placeholder="Enter your Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="d-block mx-auto button button-contactForm boxed-btn">Sign In</button>
                </div>
                <div className='text-center my-2'>
                <Link className='text-primary d-block my-2' style={{fontSize:"1.5rem"}} to={"/register"}>Don't have an Account? Register</Link>
                <Link to={"/"} className='text-primary d-block my-2' style={{fontSize:"1.5rem"}}>Back to Home</Link>
                </div>
            </div>
        </div>
      </div>
    </form>
    </>}
 </>
  );
};

export default Login;
