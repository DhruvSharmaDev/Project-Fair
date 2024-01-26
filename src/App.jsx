import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Spiner from "./components/Spinner/Spiner";
import { useEffect, useState } from "react";
import { auth, getUserFromDatabase } from "./Firebase";
import Account from "./components/Account/Account";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const getUserDetails = async (uid) => {
    const userDetails = await getUserFromDatabase(uid);
    setIsAuthenticated(true);
    setIsDataLoaded(true);
    setUserDetails(userDetails);
  };

  // helps in state management of the login and signout  from firebase 
  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsDataLoaded(true);
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);
      setIsDataLoaded(true);
      getUserDetails(user.uid);
    });
    return () => listener();
  }, []);
  return (
    <>
      <div>
        <Router>
          {isDataLoaded ? (
            <Routes>
              {!isAuthenticated && (
                <>
                  <Route path="/login" element={<Auth />}></Route>
                  <Route path="/signup" element={<Auth signup />}></Route>
                </>
              )}
              :
              <>
                <Route
                  path="/account"
                  element={
                    <Account
                      userDetails={userDetails}
                      isAuthenticated={isAuthenticated}
                    />
                  }
                ></Route>
                <Route path="/contact" element={<h1>Contact </h1>}></Route>
                <Route
                  path="/"
                  element={<Home auth={isAuthenticated} />}
                ></Route>
                <Route path="/*" element={<Navigate to="/account" />} />
              </>
            </Routes>
          ) : (
            <Spiner />
          )}
        </Router>
      </div>
    </>
  );
}

export default App;
