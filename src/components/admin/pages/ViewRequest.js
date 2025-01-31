import { collection, where,doc,updateDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { db } from '../../../Firebase'
import { Link, useNavigate } from 'react-router-dom'

const ViewRequest = () => {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    const userId=sessionStorage.getItem("userId")
    const nav=useNavigate()
    useEffect( ()=>{
        const qry= query(collection(db,"requestPlan"),orderBy("createdAt","desc"))
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
    const changeStatus=(id,status)=>{
        if(window.confirm("You are about to update status?")){
            setLoad(true)
            if(status==4){
                var reason=window.prompt("Enter reason for cancelation?")
            }
            const taskDocRef = doc(db, 'requestPlan', id)
            try {
                let data = {
                    status:status
                }
                if(status==4){
                    data.reasonCancel=reason
                }
                 updateDoc(taskDocRef, data)
                toast.success("Order Updated!!")
                setTimeout(()=>{
                    setLoad(false)
                },700)
            } catch (err) {
                setTimeout(()=>{
                    setLoad(false)
                },700)
                toast.error("Something went wrong!")
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
                        {/* <h2 className='text-success'>Admin's Exercise</h2> */}
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Plan Request
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
            <h1>Manage Requests:</h1>
            {/* realtime updates */}
            {/* snapshot-  */}
            {/* order,  */}
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>User Details</th>
                        <th>Payment Details</th>
                        <th>Goal</th>
                        <th>Date of Booking</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Gender</th>
                        <th>Diet Type</th>
                        <th>Dietry restriction</th>
                        <th>Health condition</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* null check- ? */}
                    {data?.map(
                        (el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    {el?.data?.userName}<br/>
                                    {el?.data?.email}<br/>
                                    {el?.data?.contact}
                                </td>
                                <td>
                                    <Link className='text-primary' target='_blank' to={el?.data?.payment}>{el?.data?.transaction}</Link>
                                </td>
                                <td>{el?.data?.CategoryName}</td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>{el?.data?.weight} Kg</td>
                                <td>{el?.data?.height} cm</td>
                                <td>{el?.data?.gender}</td>
                                <td>{el?.data?.dietType}</td>
                                <td>{el?.data?.foodRestriction}</td>
                                <td>{el?.data?.healthCondition}</td>
                                <td>
                                    {el?.data?.status==1?
                                        "Pending"
                                        : 
                                        el?.data?.status==2?
                                        "Approved! Share Plan"
                                        :
                                        el?.data?.status==3?
                                        <>
                                        Diet Plan Shared! <Link  className='text-primary' target='_blank' to={el?.data?.planPdf}>Click here to View</Link>
                                        </>
                                        :
                                        el?.data?.status==4&& 
                                        <>Rejected<br/>
                                        Reason: {el?.data?.reasonCancel}
                                        </>
                                    }
                                </td>
                                <td>
                                {el?.data?.status==1?
                                        <>
                                        <button className='btn btn-success btn-sm py-4 px-3' onClick={()=>{changeStatus(el.id,2)}}>Approve</button>
                                        <button className='btn btn-danger btn-sm py-4 px-3' onClick={()=>{changeStatus(el.id,4)}}>Decline</button>
                                        </>
                                        : 
                                        el?.data?.status==2?
                                        <Link className='btn btn-success btn-sm py-4 px-3'to={"/admin/sharePlan/"+el.id}>Share Plan</Link>
                                        :
                                        el?.data?.status==3?
                                        <>
                                        Diet Plan Shared!
                                        </>
                                        :
                                        el?.data?.status==4 && 
                                        "Rejected"
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

export default ViewRequest