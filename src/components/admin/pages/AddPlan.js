import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../../Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ClipLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
const AddPlan = () => {
    const {id}=useParams()
    const [description,setDescription]=useState("")
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [url,setUrl]=useState("")
    const [load,setLoad]=useState(false)
    const nav=useNavigate()
    const clear=()=>{
        setDescription("")
        setFileName("")
        setFile({})
        setUrl("")
    }
    const changeFile=(e)=>{
      setFileName(e.target.value)
      setFile(e.target.files[0])
     }
    const handleForm = async(e) => {
        e.preventDefault()
       if(!fileName){
        toast.error("Please upload image")
        return ;
    }
    setLoad(true)
    const storageRef = ref(storage, 'plan_pdf/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
        console.log(snapshot);
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUrl(downloadURL)
        });
    }
  );
    }
    useEffect(()=>{
    if(!!url){
        saveData()
    }
   },[url])

    const saveData=async ()=>{
       try{
            let data={
              description:description,
              planPdf:url,
              status:3,
              createdAt:Timestamp.now()
            }
            await updateDoc(doc(db,"requestPlan",id),data)
            toast.success("Plan Added!")
            nav("/admin/request")
          }
          catch(error){
            console.log(error)
            toast.error("Something went wrong")
          }
          setTimeout(()=>{setLoad(false)},1500)
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
                        {/* <h2 className='text-success'>Admin's Plan</h2> */}
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Add Plan
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
                    
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <input style={{fontSize:18}} required className="form-control border-success" type="text" placeholder="Enter Plan Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                          </div>
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-md-2">
                            <label>Plan Pdf</label>
                        </div>
                        <div className="col-md">
                            <input type="file" className="form-control" value={fileName} accept='application/pdf,application/vnd.ms-excel' onChange={changeFile} />
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

export default AddPlan