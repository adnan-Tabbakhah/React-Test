import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/404/404";
import GetUser from "./components/GetUser";
import AddStudents from "./components/AddStudents";
import HomePage from "./pages/HomePage/Home";
import UpdataStudents from "./components/UpdataStudents";
// import { AddStudents, GetUser, HomePage } from "./util/importLazy";

const MyComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/GetUser/:id" element={<GetUser />} />
        <Route path="/UpdateStudent/:id" element={<UpdataStudents />} />
        <Route path="/AddStdent" element={<AddStudents />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default MyComponent;
