import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../Firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../Firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
const Header = () => {
  const nav=useNavigate()
  const [allCategory,setAllCategory]=useState([])
  useEffect( ()=>{
    const qry= query(collection(db,"category"),where("status","==",true),orderBy("CategoryName","desc")
  )
    onSnapshot(qry, doc=>{
        setAllCategory(doc.docs.map((el,index)=>{
            return(
              {id:el.id, data:el.data()}
            )
        }))
    })
},[])
  const logout=()=>{
    if(window.confirm("Do you want to logout?")){
      auth.signOut()
      sessionStorage.clear()
      toast.success("Logout successfully")
      nav("/login")
    }
  }
  const userId=sessionStorage.getItem("userId")
  return (
    <>
  {/* Preloader Start */}
  <header>
    {/*? Header Start */}
    <div className="header-area">
      <div className="main-header header-sticky">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-xl-2 col-lg-2 col-md-1">
              <div className="logo">
                {/* <a href="index.html">
                  <img src="/assets/img/logo/logo.png" alt="" />
                </a> */}
                <Link to="/"><h1>Heath<span className='text-success'>coach</span></h1></Link>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-10">
              <div className="menu-main d-flex align-items-center justify-content-end">
                {/* Main-menu */}
                <div className="main-menu f-right d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/category">Category</Link>
                        <ul className="submenu">
                          <li>
                            <Link to="/category">All</Link>
                          </li>
                          {allCategory?.slice(0,4)?.map((el,index)=>(
                            <li key={index}>
                            <Link className='text-capitalize' to={"/exercises/"+el?.data?.CategoryName}>{el?.data?.CategoryName}</Link>
                          </li>
                          ))}
                         
                        </ul>
                      </li>
                       <li>
                        <Link to="/exercises">Exercises</Link>
                      </li>
                      <li>
                        <Link to="/requestPlan">Request Plan</Link>
                      </li>
                      {!!userId &&
                      <>
                      {/* // <li>
                      //   <Link to="/category">Account</Link>
                      //   <ul className="submenu">
                      //     <li>
                      //       <Link to="/requestHistory">Plan History</Link>
                      //     </li>
                      //     <li>
                      //       <Link to="/profile">Profile</Link>
                      //     </li>
                         
                      //   </ul>
                      // </li> */}
                       <li>
                        <Link to="/requestHistory">History</Link>
                      </li>
                      </>
                      }
                    </ul>
                  </nav>
                </div>
                <div className="header-right-btn f-right d-none d-lg-block ml-15">
                  {!!userId?
                  <a onClick={logout} className="btn header-btn">Sign Out</a>
                  :
                  <Link className="btn header-btn" to={"/login"}>Sign In</Link>
                  }
                </div>
              </div>
            </div>
            {/* Mobile Menu */}
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Header End */}
  </header>
</>

  )
}

export default Header
