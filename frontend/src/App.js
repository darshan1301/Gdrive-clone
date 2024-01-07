import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./features/user/login";
import NavBar from "./components/ui/navbar";
import Signup from "./features/user/signup";
import File from "./features/files/file";
import { AuthProvider } from "./authContext/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="/file/:folderName/:folderId"
              element={<File folderName={"Folder Name"} />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
