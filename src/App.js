import React, {useState}from 'react';
import Login from "./Components/Login";
import Profile from './Components/Profile';
import "./App.css"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Function to set login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <Profile />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;




