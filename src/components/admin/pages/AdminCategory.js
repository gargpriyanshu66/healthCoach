import { collection, addDoc, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../Firebase'

const AdminCategory = () => {
  const [categoryName,setCategoryName]=useState("")
  const [desc,setDesc]=useState("")
  const handleForm = async (e) => {
    e.preventDefault()
    try{
      let data={
        categoryName:categoryName,
        description:desc,
        status:true,
        createdAt:Timestamp.now()
      }
      await addDoc(collection(db,"category"),data)
      toast.success("Data Added..")
      setCategoryName("");
      setDesc("");
    }
    catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
  }
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
                        <h2 className='text-success'>Admin's category</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Category
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
        
        {/* About Law End*/}
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <form onSubmit={handleForm}>
                <div className="row">
                  <div className="col-md-2">
                    <label>Category Name</label>
                  </div>
                  <div className="col-md">
                    <input className="form-control" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} />
                  </div>

                </div>
                <div className="row my-2">
                  <div className="col-md-2">
                    <label>Description</label>
                  </div>
                  <div className="col-md">
                    <input className="form-control" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                  </div>
                </div>
                <button className="btn btn-primary w-25 my-2 d-block mx-auto">Submit</button>
              </form>
            </div>
          </div>
      </main>
    </>
  )
}

export default AdminCategory
