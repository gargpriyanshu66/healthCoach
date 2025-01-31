import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../Firebase'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot,where, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore'
import { ClipLoader } from 'react-spinners'

const EditExercise = () => {
    const [exerciseName,setExerciseName]=useState("")
    const [description,setDescription]=useState("")
    const [exerciseType,setExerciseType]=useState("")
    const [sets,setSets]=useState("")
    const [toolRequired,setToolRequired] = useState("")
    const [link,setLink]=useState("")
    const [categoryName,setCategoryName]=useState("")
    const [load,setLoad]=useState("")
    const [allCategory,setAllCategory]=useState([])
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [url,setUrl]=useState("")
   const [previousImage,setPreviousImage]=useState("")
   const param=useParams()
   const id=param.id
   const nav=useNavigate()
   const changeFile=(e)=>{
    setFileName(e.target.value)
    setFile(e.target.files[0])
   }
   useEffect( ()=>{
    const qry= query(collection(db,"category"),where("status","==",true),orderBy("CategoryName","desc")
  )
    onSnapshot(qry, doc=>{
        setAllCategory(doc.docs.map((el,index)=>{
            return(
              {id:el.id, data:el.data()}
            )
        }))
    })
    setTimeout(()=>{
      setLoad(false)
    },1000)
},[])

   useEffect(
    ()=>{
        getData()
    } ,[])
    
   const getData=async ()=>{
    let docRefs=doc(db,"exercises",id)
    let data=await getDoc(docRefs)
    if(data.exists()){
        let finalData=data.data()
        setExerciseName(finalData.ExerciseName)
        setExerciseType(finalData.ExerciseType)
        setDescription(finalData.Description)
        setCategoryName(finalData.CategoryName)
        setLink(finalData.Link)
        setToolRequired(finalData.ToolRequired)
        setSets(finalData.Sets)
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
        // Upload file and metadata to the object 'images/mountains.jpg'
        //file.name- is the useState name
        const storageRef = ref(storage, 'product_images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Listen for state changes, errors, and completion of the upload.
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
                ExerciseName:exerciseName,
                Description:description,
                ExerciseType:exerciseType,
                CategoryName:categoryName,
                Sets:sets,
                ToolRequired:toolRequired,
                Link:link,
              }
            if(!!url){
                data.image=url
            }
        //    console.log(data);
        const docRef=doc(db,"exercises",id)
        await updateDoc(docRef,data)
        toast.success("Data updated successfully")
        nav("/admin/manageexercise")
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
                        <h2 className='text-success'>Admin's Exercise</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Edit Exercise
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
          <div className="row justify-content-center ">
                  <div className="col-10 col-md-8 col-sm-12 pt-5 border border-success" style={{backgroundColor:"#e7fce6"}}>
                    <div className='row my-2'>
                        <div className='col-md-4 offset-md-4'>
                            <img src={previousImage} className='img-fluid w-100'/>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                        <select style={{fontSize:18}} className="form-control border-success" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}>
                          <option value={""} selected disabled>Choose Category</option>
                          {allCategory?.map((el,index)=>(
                            <option>{el?.data?.CategoryName}</option>
                          ))}
                        </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                              <input required style={{fontSize:18}} className="form-control border-success"type="text" placeholder="Enter Exercise Name" value={exerciseName} onChange={(e)=>{setExerciseName(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <input  required style={{fontSize:18}} className="form-control border-success" type="text" placeholder="Exercise Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                          <select required style={{fontSize:18}} className="form-control border-success" type="text" placeholder="Exercise Type" value={exerciseType} onChange={(e)=>{setExerciseType(e.target.value)}}>
                            <option value={""} selected disabled>Choose Exercise Type</option>
                            <option>Triceps</option>
                            <option>Biceps</option>
                            <option>Chest</option>
                            <option>Shoulders</option>
                            <option>Quads</option>
                            <option>Calves</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                          <input required style={{fontSize:18}} className="form-control border-success" type="text" placeholder="Sets" value={sets} onChange={(e)=>{setSets(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                          <input style={{fontSize:18}} className="form-control border-success" type="text" placeholder="Tool Required" value={toolRequired} onChange={(e)=>{setToolRequired(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                    
                      <div className="row justify-content-between">
                        <div className="col-4">
                          <div className="form-group">
                          <input type="file" className="form-control border-success" id="myFile" name="filename"
                          value={fileName} onChange={changeFile}
                          />
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="form-group">
                          <input style={{fontSize:18}} className="form-control border-success" type="text" placeholder="Link for videos" value={link} onChange={(e)=>{setLink(e.target.value)}}/>
                          </div>
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

export default EditExercise
