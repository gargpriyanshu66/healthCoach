import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { db } from '../../../Firebase'
import { Link } from 'react-router-dom'

const ViewEnquiry = () => {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    useEffect( ()=>{
        const qry= query(collection(db,"queries"), orderBy("createdAt","desc")
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
  
    const deleteData=async (id)=>{
        if(window.confirm(`You are about to delete query?`)){
          setLoad(true)
          try{
            await deleteDoc(doc(db,"users",id))
            toast.success(`Data deleted successfully`)
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
                        {/* <h2 className='text-success'>Admin's </h2> */}
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                           Enquiry
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
            <h1>Manage Enquiry</h1>
            {/* realtime updates */}
            {/* snapshot-  */}
            {/* order,  */}
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
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
                                <td>{el?.data?.subject}</td>
                                <td>{el?.data?.message}</td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>
                                <button className="btn btn-danger" onClick={
                                  ()=>{
                                    deleteData(el.id)
                                  }
                                }>
                                  <i className='fa fa-trash'></i>
                                </button>
                                <a className='btn btn-info' href={`mailto:${el?.data?.email}`}>Reply</a>
                               
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