import { collection, getCountFromServer } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { db } from '../../../Firebase'

const Dashboard = () => {
    const [load,setLoad]=useState(true)
    const [user,setUser]=useState(0)
    const [category,setCategory]=useState(0)
    const [product,setProduct]=useState(0)

    useEffect(()=>{
        getUserCount();
        getCategoryCount();
        getProductCount();
        setTimeout(()=>{setLoad(false)},1500)
    },[])
    const getUserCount=async ()=>{
        let ref=collection(db,"users")
        let que=await getCountFromServer(ref)
        console.log(que.data().count);
        setUser(que.data().count)
        
    }
    const getCategoryCount=async ()=>{
        let ref=collection(db,"category")
        let que=await getCountFromServer(ref)
        console.log(que.data().count);
        setCategory(que.data().count)
        
    }
    const getProductCount=async ()=>{
        let ref=collection(db,"requestPlan")
        let que=await getCountFromServer(ref)
        console.log(que.data().count);
        setProduct(que.data().count)
        
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
                        <h2 className='text-success'>Admin Side</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Dashboard
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

        <div className={load==true?"d-none":"container"}>
            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card p-3">
                        <h1 className="text-center">Happy Clients</h1>
                        <h3 className="text-center">{user}</h3>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card p-3">
                        <h1 className="text-center">Total category</h1>
                        <h3 className="text-center">{category}</h3>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card p-3">
                        <h1 className="text-center">Total Booking</h1>
                        <h3 className="text-center">{product}</h3>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard