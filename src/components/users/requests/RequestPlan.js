import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db, storage} from '../../../Firebase'
import { ClipLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { uploadBytesResumable,ref ,getDownloadURL} from 'firebase/storage'
const RequestPlan = () => {
    const [weight,setWeight]=useState("")
    const [height,setHeight]=useState("")
    const [healthCondition,setHealthCondition]=useState("")
    const [foodRestriction,setFoodRestriction]=useState("")
    const [dietType,setDietType]=useState("")
    const [gender,setGender]=useState("")
    const [categoryName,setCategoryName]=useState("")
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [url,setUrl]=useState("")
    const [transaction,setTransaction]=useState("")
    const [load,setLoad]=useState("")
    const [allCategory,setAllCategory]=useState([])
    const nav=useNavigate()
    let userId=sessionStorage.getItem("userId")
    useEffect(()=>{
        if(!userId){
            toast.error("Please login")
            nav("/login")
        }
    },[])
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
  const handleForm = async(e) => {
    e.preventDefault()
   if(!fileName){
    toast.error("Please upload image")
    return ;
}
setLoad(true)

// Upload file and metadata to the object 'images/mountains.jpg'
//file.name- is the useState name
const storageRef = ref(storage, 'payment_images/' + file.name);
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
  toast.error("something went wrong", error.code);
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
}
    const saveData = async() => {
        try{
            let data={
              categoryName:categoryName,
              height:height,
              weight:weight,
              healthCondition:healthCondition,
              foodRestriction:foodRestriction,
              dietType:dietType,
              gender:gender,
              payment:url,
              transaction:transaction,
              userName:sessionStorage.getItem("userName"),
              email:sessionStorage.getItem("email"),
              contact:sessionStorage.getItem("contact"),
              userId:sessionStorage.getItem("userId"),
              status:1,
              //1-> booked, 2->approved, 3-> diet plan shared, 4-> rejected
              createdAt:Timestamp.now()
            }
            await addDoc(collection(db,"requestPlan"),data)
            toast.success("Request Added!")
            nav("/requestHistory")
          }
          catch(error){
            console.log(error)
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
                        <h2 className='text-success'>Request Your Own Plan</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Plans
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
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                        <select style={{fontSize:18}} className="form-control border-success" value={categoryName} required onChange={(e)=>{setCategoryName(e.target.value)}}>
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
                              <input required style={{fontSize:18}} className="form-control  border-success" type="number" min={20} max={200} placeholder="Enter Your Current Weight in kgs" value={weight} onChange={(e)=>{setWeight(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <input  required style={{fontSize:18}} className="form-control border-success" type="number" min={40} max={300} placeholder="Enter your height in cm" value={height} onChange={(e)=>{setHeight(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                          <select required style={{fontSize:18}} className="form-control border-success"  placeholder="Enter your diet Type" value={dietType} onChange={(e)=>{setDietType(e.target.value)}}>
                            <option value={""} selected disabled>Choose Diet Type</option>
                            <option>Veg</option>
                            <option>Non-Veg</option>
                            <option>Vegan</option>
                            <option>Eggetarian</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                          <input required style={{fontSize:18}} className="form-control border-success" type="text" placeholder="Enter any food restriction or allergy" value={foodRestriction} onChange={(e)=>{setFoodRestriction(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                          <input style={{fontSize:18}}  required className="form-control border-success" type="text" placeholder="Enter any healthy conditon E.g. PCOD" value={healthCondition} onChange={(e)=>{setHealthCondition(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                    
                      <div className="row justify-content-between">
                        <div className="col-12">
                          <div className="form-group border py-4 border-success">
                          <input type="radio" name='gender' className="mx-4" required value={gender} onChange={(e)=>{setGender("Male")}}/><span className='text-secondary ' style={{fontSize:"2rem"}}>Male</span>
                          <input type="radio" required name='gender' className="mx-4"  value={gender} onChange={(e)=>{setGender("Female")}}/><span className='text-secondary ' style={{fontSize:"2rem"}}>Female</span>
                          
                          </div>
                        </div>
                      </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p>To Get your plan you have to pay &#8377; 500 on the Qr code Given <Link className='text-success' target='_blank' to={"/assets/img/qrcode.png"}>HERE</Link> for a monthly plan, After payment share the payment screenshot as well as transaction id here</p>
                            </div>
                            <div className='col-md-6'>
                                <input type='file' className='form-control'
                                value={fileName}
                                onChange={(e)=>{setFile(e.target.files[0]); setFileName(e.target.value)}}
                                required/>
                            </div>
                            <div className='col-md-6'>
                                <input type='text' className='form-control' placeholder='Enter the Transaction Id' required
                                value={transaction}
                                onChange={(e)=>{setTransaction(e.target.value)}}
                                />
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

export default RequestPlan