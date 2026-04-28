import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register'
import Course from './pages/course/course';
import Courses from './pages/course/Courses';
import Profile from './pages/profile/profile';
import Learnings from './pages/learning/learnings';
import Home from './pages/landing/Home';
import DUsers from './pages/dashBoard/DUsers';
import DCourses from './pages/dashBoard/DCourses';
import Assessment from './pages/assessment/Assessment';
import ErrorPage from './pages/error/ErrorPage';
import AddQuestions from './pages/dashBoard/AddQuestions';
import Performance from './pages/profile/Performance';
import Certificate from './pages/assessment/certificate';
import Forum from './pages/course/forum';
import AdminDashboard from './pages/dashBoard/AdminDashboard';
import UserDashboard from './pages/dashBoard/UserDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/addquestions/:id" element={<AddQuestions/>}/>
          <Route path='/admin' element={<AdminDashboard/>} />
          <Route path='/dashboard' element={<UserDashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/course/:id' element={<Course/>} />
          <Route path='/discussion/:id' element={<Forum/>} />
          <Route path='/certificate/:courseId' element={<Certificate/>} />
          <Route path='/assessment/:id' element={<Assessment/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/learnings' element={<Learnings/>} />
          <Route path='/Dcourses' element={<DCourses/>} />
          <Route path='/Dusers' element={<DUsers/>} />
          <Route path='/Performance' element={<Performance/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
