import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../Firebase'
import { toast } from 'react-toastify'

const Footer = () => {
  const [email,setEmail] = useState("")

const handleForm = async(e) => {
    e.preventDefault()
    try{
        let data={
          User_Email:email,
          status:true,
          createdAt:Timestamp.now()
        }
        await addDoc(collection(db,"Queries"),data)
        toast.success("Data Added..")
        setEmail("")
      }
      catch(error){
        console.log(error)
        toast.error("Something went wrong")
      }
}

  return(
    <>
  <footer>
    <div
      className="footer-wrappr section-bg3"
      data-background="assets/img/gallery/footer-bg.png"
    >
      <div className="footer-area footer-padding ">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
              <div className="single-footer-caption mb-50">
                {/* logo */}
                <div className="footer-logo mb-25">
                  <a href="index.html">
                    <img src="assets/img/logo/logo2_footer.png" alt="" />
                  </a>
                </div>
                <d iv="" className="header-area">
                  <div className="main-header main-header2">
                    <div className="menu-main d-flex align-items-center justify-content-start">
                      {/* Main-menu */}
                      <div className="main-menu main-menu2">
                        <nav>
                        <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/services">Category</Link>
                      </li>
                      <li>
                        <Link to="/blog">Exercises</Link>
                      </li>
                      <li>
                        <Link to="/contact">Request history</Link>
                      </li>
                      <li>
                        <Link to="/contact">Profile</Link>
                      </li>
                    </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </d>
                {/* social */}
                <div className="footer-social mt-50">
                  <Link href="">
                    <i className="fab fa-twitter" />
                  </Link>
                  <Link href="">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link href="">
                    <i className="fab fa-pinterest-p" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div className="single-footer-caption">
                <div className="footer-tittle mb-50">
                  <h4>For any Query</h4>
                </div>
                {/* Form */}
                <div className="footer-form">
                  <div id="mc_embed_signup">
                    <form onSubmit={handleForm}>
                      <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder=" Email Address " className="placeholder hide-on-focus"/>
                      <div className="form-icon">
                        <button type="submit" name="submit" id="newsletter-submit" className="email_icon newsletter-submit button-contactForm" >Subscribe</button>
                      </div>
                      <div className="mt-10 info" />
                    </form>
                  </div>
                </div>
                <div className="footer-tittle">
                  <div className="footer-pera">
                    <p>
                      have any Queris regarding this site contact us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer-bottom area */}
      <div className="footer-bottom-area">
        <div className="container">
          <div className="footer-border">
            <div className="row">
              <div className="col-xl-10 ">
                <div className="footer-copy-right">
                  <p>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright © All rights reserved | This template is made with{" "}
                    <i className="fa fa-heart" aria-hidden="true" /> by{" "}
                    <Link to="/" target="_blank">
                      www.healthcoach.com
                    </Link>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Scroll Up */}
  <div id="back-top">
    <a title="Go to Top" href="#">
      {" "}
      <i className="fas fa-level-up-alt" />
    </a>
  </div>
</>

  )
}

export default Footer
