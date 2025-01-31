import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../../Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ClipLoader } from 'react-spinners';
const AddCategory = () => {
    const [categoryName,setCategoryName]=useState("")
    const [description,setDescription]=useState("")
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [url,setUrl]=useState("")
    const [load,setLoad]=useState(false)
    const clear=()=>{
        setCategoryName("")
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

    // Upload file and metadata to the object 'images/mountains.jpg'
    //file.name- is the useState name
    const storageRef = ref(storage, 'category_images/' + file.name);
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
    useEffect(()=>{
    if(!!url){
        saveData()
    }
   },[url])

    const saveData=async ()=>{
       try{
            let data={
              CategoryName:categoryName,
              Description:description,
              image:url,
              status:true,
              createdAt:Timestamp.now()
            }
            await addDoc(collection(db,"category"),data)
            toast.success("Data Added..")
            clear()
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
                        <h2 className='text-success'>Admin's category</h2>
                        <h1 data-animation="fadeInUp" data-delay=".3s">
                          Add Category
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

export default AddCategory