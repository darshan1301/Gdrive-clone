import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import NavBar from "./components/shared/navbar";
import Signup from "./components/pages/signup";
import File from "./components/pages/file";
import { AuthProvider } from "./components/authentication/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="home" element={<Home />} />
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/file/:folderName/:folderId" element={<File folderName={"Folder Name"} />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
