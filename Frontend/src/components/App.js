import React from 'react';
import {Home} from "./Pages/Home";
import {Login} from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Chatbox from "./Pages/Chat";
import Video from "./Pages/Video";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {createGlobalStyle} from "styled-components";
import VideoFriends from './Pages/VideoFriends';

const GlobalStyle = createGlobalStyle`
   body{
       background: white;
       min-height: 100vh;
       margin: 0;
       color: black;
   }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
          <Switch>
             <Route path="/login">
                <Login/>
             </Route>
             <Route path="/register">
                <Register/>
             </Route>
             <Route path="/Home">
                <Home/>
             </Route>
             <Route path="/Dashboard">
                <Dashboard/>
             </Route>
             <Route path="/video">
                <Video />
             </Route>
             <Route path="/chatbox/:name">
                <Chatbox/>
             </Route>
             <Route path="/videofriends">
                <VideoFriends />
             </Route>
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
