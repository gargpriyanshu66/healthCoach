import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from './components/layout/Master';
import About from './components/page/About';
import Contact from './components/page/Contact';
import Home from './components/page/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminMaster from './components/admin/layout/AdminMaster';
import AdminCategory from './components/admin/pages/AdminCategory';
import AdminExercise from './components/admin/pages/AdminExercise';
import AddCategory from './components/admin/pages/AddCategory';
import AddExercises from './components/admin/pages/AddExercises';
import ManageCategory from './components/admin/pages/ManageCategory';
import EditCategory from './components/admin/pages/EditCategory';
import Dashboard from './components/admin/pages/Dashboard';
import ManageExercise from './components/admin/pages/ManageExercise';
import EditExercise from './components/admin/pages/EditExercises';
import ManageUser from './components/admin/pages/ManageUser';
import Category from './components/page/Category';
import Exercise from './components/page/Exercises';
import RequestPlan from './components/users/requests/RequestPlan';
import RequestHistory from './components/users/requests/RequestHistory';
import ViewRequest from './components/admin/pages/ViewRequest';
import AddPlan from './components/admin/pages/AddPlan';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Master/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/exercises' element={<Exercise/>}/>
          <Route path='/exercises/:category' element={<Exercise/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/requestPlan' element={<RequestPlan/>}/>
          <Route path='/requestHistory' element={<RequestHistory/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<AdminMaster/>}>
          <Route path='/admin' element={<Dashboard/>}/>
          <Route path='/admin/category' element={<AdminCategory/>}/>
          <Route path='/admin/addcategory' element={<AddCategory/>}/>
          <Route path='/admin/managecategory' element={<ManageCategory/>}/>
          <Route path='/admin/editcategory/:id' element={<EditCategory/>}/>
          <Route path='/admin/addexercise' element={<AddExercises/>}/>
          <Route path='/admin/manageexercise' element={<ManageExercise/>}/>
          <Route path='/admin/exercise' element={<AdminExercise/>}/>
          <Route path='/admin/request' element={<ViewRequest/>}/>
          <Route path='/admin/editexercise/:id' element={<EditExercise/>}/>
          <Route path='/admin/manageuser' element={<ManageUser/>}/>
          <Route path='/admin/sharePlan/:id' element={<AddPlan/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    <ToastContainer position="top-right" autoClose={1100} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
}

export default App;
