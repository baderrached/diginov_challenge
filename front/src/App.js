import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Porjects from "./views/Project/Porjects";
import SignIn from "./views/Auth/Login"
import Tasks from "./views/Project/ProjectDetails"
import RequireAuth from "./noauth.routes";

function App() {
  return (
    <div id="pageWrap">
      <BrowserRouter>
        <Routes>
        <Route path="/signin" element={<SignIn />} />
          <Route element={<RequireAuth allow />}>
            <Route path="/" element={<Porjects />} exact />
          </Route>
          <Route element={<RequireAuth allow />}>
            <Route path="/project/:projectId" element={<Tasks />} exact />
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;


// auth.
// todo list user: ... 
// product manager two pages:
  // all projects.
  // tasks.
