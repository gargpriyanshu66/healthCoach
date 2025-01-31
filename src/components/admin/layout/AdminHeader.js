import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../Firebase'
import { toast } from 'react-toastify'

const AdminHeader = () => {
  const nav=useNavigate()
  const logout=()=>{
    if(window.confirm("Do you want to logout?")){
      auth.signOut()
      sessionStorage.clear()
      toast.success("Logout successfully")
      nav("/login")
    }
  }
  return (
    <>
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
                <Link to="/admin"><h1>Heath <span className='text-success'>coach</span></h1></Link>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-10">
              <div className="menu-main d-flex align-items-center justify-content-end">
                {/* Main-menu */}
                <div className="main-menu f-right d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li>
                        <Link to="/admin">Home</Link>
                      </li>
                      <li>
                        <Link to="/admin/addcategory">Category</Link>
                        <ul className="submenu">
                          <li>
                            <Link to="/admin/addcategory">Add</Link>
                          </li>
                          <li>
                            <Link to="/admin/managecategory">Manage</Link>
                          </li>
                  
                        </ul>
                      </li>
                      <li>
                        <Link to="/admin/addexercise">Exercise</Link>
                        <ul className="submenu">
                          <li>
                            <Link to="/admin/addexercise">Add</Link>
                          </li>
                          <li>
                            <Link to="/admin/manageexercise">Manage</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/admin/request">Request</Link>
                      </li>
                      <li>
                        <Link to="/admin/manageuser">Users</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="header-right-btn f-right d-none d-lg-block ml-15">
                  <a onClick={logout} className="btn header-btn">Sign Out</a>
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

export default AdminHeader