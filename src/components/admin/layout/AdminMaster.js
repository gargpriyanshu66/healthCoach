import React from 'react'
import AdminHeader from './AdminHeader'
import { Navigate, Outlet } from 'react-router-dom'
import AdminFooter from './AdminFooter'
import { toast } from 'react-toastify'

const AdminMaster = () => {
  let userId = sessionStorage.getItem("userId")
  let userType=sessionStorage.getItem("userType")
  if(!userId || userType!=1){
    setTimeout(()=>{
      toast.error("please login.!")
    },500)
    return <Navigate to="/login"/>
  }
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <AdminFooter/>
    </>
  )
}

export default AdminMaster