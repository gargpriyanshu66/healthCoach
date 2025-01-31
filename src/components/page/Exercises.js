import { collection, where, onSnapshot, orderBy, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { db } from '../../Firebase'
import "./Exercises.css"
import { Link, useParams } from 'react-router-dom'
const Exercise = () => {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    const param=useParams()
    const category=param.category
    useEffect( ()=>{
        if(!category){
            var qry= query(collection(db,"exercises"),where("status","==",true),orderBy("ExerciseName","desc"))
        }else{
            var qry= query(collection(db,"exercises"),where("CategoryName","==",category),where("status","==",true),orderBy("ExerciseName","desc"))
        }
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
  return (
    <>
    <main>
  {/*? Slider Area Start*/}
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
                    Exercises
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
  {/* Slider Area End */}
  <ClipLoader cssOverride={{display:"block",margin:"20vh auto"}} loading={load}/>
       
    <div className={load==true && "d-none"}>
  <section className="wantToWork-area">
    <div className="container">
      <div className="wants-wrapper w-padding2">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-7 col-lg-9 col-md-8">
            <div className="wantToWork-caption wantToWork-caption2">
              <h2>
                Happy mind <br />
                healthy life
              </h2>
              <p>
                A person should exercise
                <br /> 150 minutes per week
              </p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4">
            <Link className="btn btn-success f-right sm-left" to={"/requestPlan"}>
              Request plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  
    {/*? Services Area Start */}
    <div className="service-area">
        <div className="container">
        <div className="row">
            {data?.length>0?
                data?.map((el,index)=>(
                <div className="col-lg-4 text-capitalize col-md-6 col-sm-6" key={index}>
                    <div className="single-cat text-center mb-50">
                    <div className="cat-icon px-4">
                        <img src={el?.data?.image} className='w-100' style={{height:"250px"}} alt="" />
                    </div>
                    <div className="cat-cap">
                        <h5>
                        <div>{el?.data?.ExerciseName}</div>
                        </h5>
                        <p className='description'>
                        {el?.data?.Description}
                        </p>
                        <p>
                          <div>Sets: {el?.data?.Sets}</div>
                          <div>Tools Required: {el?.data?.ToolRequired}</div>
                          <div>{el?.data?.ExerciseType}</div>
                        </p>
                        <Link to={el?.data?.Link} className="plus-btn">
                        <i className="ti-eye" />
                        </Link>
                    </div>
                    </div>
                </div>
                ))
                :
                <h1 className='my-5 p-5 text-center'>No Data found!</h1>
            }
            
            
        </div>
        </div>
    </div>
    </div>
  {/* Services Area End */}

  {/*? About Law Start*/}
  <section className="about-low-area mt-80">
    <div className="container">
      <div className="about-cap-wrapper">
        <div className="row">
          <div className="col-xl-5  col-lg-6 col-md-10 offset-xl-1">
            <div className="about-caption mb-50">
              {/* Section Tittle */}
              <div className="section-tittle mb-35">
                <h2>100% satisfaction guaranteed.</h2>
              </div>
              <p>Almost before we knew it, we had left the ground</p>
              <Link className="border-btn" to={"/requestPlan"}>
                Request a Plan Today
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            {/* about-img */}
            <div className="about-img">
              <div className="about-font-img">
                <img src="/assets/img/gallery/about2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Law End*/}
</main>
</>

  )
}

export default Exercise
