import './App.css';
import Navigation from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/SignUp';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Privatecomp from './Components/PrivateComponents';
import Profile from './Components/Profile';
import Question from './Components/Question';
import Addproblem from './Components/Addproblem'
import Statement from './Components/Statement';
import Home from './Components/Homepage';
import Forgetpass from './Components/Forgetpass';
import Resetpass from './Components/Reset';
import List from './Components/ProblemList';
import GoogleSignup from './Components/GoogleSignup';
function App() {
  return (
    <div className='App' >

      <BrowserRouter>
        <Navigation />

        <Routes>

          <Route element={<Privatecomp />}>
            <Route path='/add-problem' element={<Addproblem />} />
            <Route path='/profile/:name' element={<Profile />} />
            <Route path='/:type' element={<Question />} />
            <Route path='/problem/:id' element={<Statement />} />
            <Route path='/user/:tag' element={<List/>} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forget-link' element={<Forgetpass/>}/>
          <Route path='/' element={<Home />} />
          <Route path='/reset-link' element={<Resetpass />} />
          <Route path='/google/login' element={<GoogleSignup />} />

        </Routes>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
