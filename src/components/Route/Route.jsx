import { Routes, Route } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";

const Route = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LoginView />} />
      <Route path="/signup" element={<SignupView />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Route;
