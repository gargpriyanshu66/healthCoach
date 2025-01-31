import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { db } from '../../../Firebase'
import { Link } from 'react-router-dom'

const ManageCategory = () => {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    useEffect( ()=>{
        const qry= query(collection(db,"category"),orderBy("CategoryName","desc")
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
      // console.log(date.toDate(), "date is");
      let date1=date.toDate().toString()
      // return date1
      let newDate=moment(date1).format("Do MMM, YYYY")
      // console.log(newDate);
      return newDate
    }
    const changeStatus=async (id, status)=>{
      setLoad(true)
      if(window.confirm(`Do you really want to ${status?"Active":"In-active"} category?`)){
        try{
          await updateDoc(doc(db,"category",id),{status:status})
          toast.success("Status changed successfully")
        }
        catch(err){
          toast.error("Something went wrong")
        }
      }
      setTimeout(()=>{
        setLoad(false)
      },1000)
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
                        <h2 className='text-success'>Admin's category</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Manage Category
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
            <h1>ManageCategory</h1>
            {/* realtime updates */}
            {/* snapshot-  */}
            {/* order,  */}
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Category name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* null check- ? */}
                    {data?.map(
                        (el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{el?.data?.CategoryName}</td>
                                <td>{el?.data?.Description}</td>
                                <td>
                                    <img style={{height:"100px",width:"100px"}} src={el?.data?.image}/>
                                </td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>
                                    <Link to={"/admin/editcategory/"+el.id} className="btn btn-success" >
                                        <i className='fa fa-edit'></i>
                                    </Link>
                                </td>
                                <td>
                                  {el?.data?.status?
                                <button className='btn btn-danger' onClick={()=>{changeStatus(el.id,false)}}>In-active</button> 
                                :
                                <button className='btn btn-success' onClick={()=>{changeStatus(el.id,true)}}>Active</button> 
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

export default ManageCategory