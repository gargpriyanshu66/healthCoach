import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../Firebase'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore'
import { ClipLoader } from 'react-spinners'

const EditCategory = () => {
    const [categoryName,setCategoryName]=useState("")
    const [description,setDescription]=useState("")
    const [file,setFile]=useState({})
   const [fileName,setFileName]=useState("")
   const [url,setUrl]=useState("")
   const [previousImage,setPreviousImage]=useState("")
   const [load,setLoad]=useState(true)
   const param=useParams()
   const id=param.id
   const nav=useNavigate()
   const changeFile=(e)=>{
    setFileName(e.target.value)
    setFile(e.target.files[0])
   }

   useEffect(
    ()=>{
        getData()
    } ,[])
    
   const getData=async ()=>{
    let docRefs=doc(db,"category",id)
    let data=await getDoc(docRefs)
    if(data.exists()){
        let finalData=data.data()
        setCategoryName(finalData.CategoryName)
        setDescription(finalData.Description)
        setPreviousImage(finalData.image)
      
    }else{
        toast.error("No data found")
    }
    setTimeout(() => {
      setLoad(false)
    }, 1500);
   }
   

    const handleForm=(e)=>{
        e.preventDefault()
        setLoad(true)
        if(!!fileName){
        const storageRef = ref(storage, 'product_images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed',
        (snapshot) => {
            console.log(snapshot);
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            toast.error("something went wrong", error.code)
            setLoad(false)
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            //***store in state so that we can use it later
            setUrl(downloadURL)
            });
        }
    );
        }else{
            saveData()
        }
       }
       const saveData=async ()=>{
        try{
            let data={
                CategoryName:categoryName,
                Description:description,
              }
            if(!!url){
                data.image=url
            }
        //    console.log(data);
        const docRef=doc(db,"category",id)
        await updateDoc(docRef,data)
        toast.success("Data updated successfully")
        nav("/admin/managecategory")
        }
        catch(err){
            toast.error("Something went wrong")
        }
        setTimeout(() => {
          setLoad(false)
        }, 1500);
       }
       useEffect(()=>{
        if(!!url){
            saveData()
        }
       
       },[url])
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
                          Edit Category
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
        <div className='d-flex justify-content-center'>
          <ClipLoader color='skyblue' size={75} loading={load}/>
        </div>
        <div className={load && "d-none"}>
          <form onSubmit={handleForm} className="form-contact contact_form mb-5" >
        <div className="container">
          <div className="row justify-content-center">
              <div className="col-10 col-md-8 col-sm-12 border-25 border-success shadow pt-5 border border-success" style={{backgroundColor:"#e7fce6"}}>
                <div className='row my-2'>
                  <div className='col-md-4 offset-md-4'>
                    <img src={previousImage} className='img-fluid w-100'/>
                  </div>
                </div>
                <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                          <input style={{fontSize:18}} required className="form-control border-success"type="text" placeholder="Enter Category Name" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <input style={{fontSize:18}} required className="form-control border-success" type="text" placeholder="Enter Category Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-2">
                        <label>Image</label>
                    </div>
                    <div className="col-md">
                        <input type="file" className="form-control" value={fileName} onChange={changeFile} />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                      <button type="submit" className="d-block mx-auto button button-contactForm boxed-btn">Save</button>
                  </div>
              </div>
          </div>
        </div>
          </form>
        </div>
    </>
  )
}

export default EditCategory
