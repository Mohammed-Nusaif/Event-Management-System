import { createContext, useEffect, useState } from "react";
import "./App.css";
import Nav1 from "./components/Nav1";
import Spotlight from "./components/Spotlight";
import Loginpage from "./components/Loginpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signuppage from "./components/Signuppage";
import Explore from "./components/Explore";
import Footer1 from "./components/Footer1";
import Create from "./components/Actions.jsx/Create";
import Eventplans from "./components/Eventplans";
import Update from "./components/Actions.jsx/Update";
import Delete from "./components/Actions.jsx/Delete";
import PrivateRoute from "./components/Adminsection/PrivateRouter";
import Adminpanel from "./components/Adminsection/Adminpanel";

const LoggedInContext = createContext();
const Myeventcrud = createContext();
const Myemail = createContext();
export const Myusername = createContext() ;
export const Mypassword = createContext()
function App() {
  const [eventdata, seteventData] = useState([]);
  const [Email, setEmail] = useState("");;
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [Password, setPassword] = useState( "");  
  return (
    <div className="App">

      <LoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <Myeventcrud.Provider value={[eventdata, seteventData]}>
          <Myemail.Provider value={[Email,setEmail]}>
          <Myusername.Provider value={[username, setUsername]}>
          <Mypassword.Provider value={[Password, setPassword]}>
          <BrowserRouter>
            <Routes>
              
             
              <Route
                path="/"
                element={
                  <>
                    <Nav1 />
                    <Spotlight />
                    <Explore />
                    <Footer1 />
                  </>
                }
              />
              <Route path="/admin/*" element={<Adminpanel/>} />
              <Route path="/loginto" element={<Loginpage />} />
              <Route path="/signinto" element={<Signuppage />} />
              <Route path='/Bookplans' element={<Eventplans/>}/>
              <Route path='/create' element={<Create/>}/>
              <Route path='/update/:id' element={<Update/>}/>
              <Route path='/Deletepage/:id' element={<Delete/>}/>
            </Routes>
          </BrowserRouter>
          </Mypassword.Provider>
          </Myusername.Provider>
          </Myemail.Provider>
        </Myeventcrud.Provider>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
export { LoggedInContext , Myeventcrud,Myemail};
