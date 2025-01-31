import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { db } from '../../../Firebase'
import { Link } from 'react-router-dom'

const ManageUser = () => {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    useEffect( ()=>{
        const qry= query(collection(db,"users"), where("userType","==",2), orderBy("createdAt","desc")
      )
        onSnapshot(qry, doc=>{
            setData(doc.docs.map((el,index)=>{
                return(
                  {id:el.id, data:el.data()}
                )
            }))
        })
        setTimeout(()=>{
          setLoad(false)
        },1000)
    },[])
    
    const getDate=(date)=>{
      let date1=date.toDate().toString()
      let newDate=moment(date1).format("Do MMM, YYYY")
      return newDate
    }
  
    const blockUser=async (id, status)=>{
        if(window.confirm(`You are about to ${status==true?"Unblock":"Block"} User?`)){
          setLoad(true)
          try{
            await updateDoc(doc(db,"users",id),{status:status})
            toast.success(`User ${status==true?"Unblocked":"Blocked"}  successfully`)
            setTimeout(()=>{
              setLoad(false)
            },1000)
          }
          catch(err){
            toast.error("Something went wrong")
            setTimeout(()=>{
              setLoad(false)
            },1000)
          }
        }
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
                        <h2 className='text-success'>Admin's User</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                           Users
                        </h1>
                        <p data-animation="fadeInUp" data-delay=".6s">
                          Almost before we knew it, we
                          <br /> had left the ground
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
       
        <div className={load==true?"d-none":"container table-responsive"}>
            <h1>Manage User</h1>
            {/* realtime updates */}
            {/* snapshot-  */}
            {/* order,  */}
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        {/* <th>Goals</th> */}
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* null check- ? */}
                    {data?.map(
                        (el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{el?.data?.name}</td>
                                <td>{el?.data?.email}</td>
                                <td>{el?.data?.contact}</td>
                                {/* <td>{el?.data?.goals}</td> */}
                                <td>{el?.data?.status?"Active":"In-Active"}</td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>
                                {el?.data?.status?
                                <button className="btn btn-danger" onClick={
                                  ()=>{
                                    blockUser(el.id, false)
                                  }
                                }>
                                  Block
                                </button>
                                :
                                <button className="btn btn-success" onClick={
                                    ()=>{
                                      blockUser(el.id, true)
                                    }
                                  }>
                                    Unblock
                                  </button>
                                }
                                </td> 
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>

    </>
  )
}

export default ManageUser