import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Home from "./Home";
import Profile from "./Profile";
import Loading from "./Loading";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setAuth(data);
    })
  }, [])

  if (auth === null) {
    return <Loading/>
  }
  if (auth) {
    return <Profile auth={auth}/>
  }
  return <Home/>
}

export default App;
