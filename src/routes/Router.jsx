import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/Loginpage";
import PostPage from "../pages/PostPage";
import PrivateRoute from "../privateRoute/privateroute";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/createPost"
        element={
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
export default Routers;
