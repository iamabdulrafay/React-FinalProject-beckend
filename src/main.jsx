import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import VerifyOtpForm from "./screens/OtpVerficationForm.jsx";
import CourseDets from "./screens/CourseDets.jsx";
import App from "./App.jsx";
import Courses from "./screens/Courses.jsx";
import About from "./screens/About.jsx";
import ProtectedRoute from "./screens/ProtectedRoute.jsx";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatComponent from "./components/chat/Chat.jsx";
import FixedButton from "./components/fixedbutton/FixedButton.jsx";
import CourseVideos from "./screens/CourseVideos.jsx";

// const CourseVideos = lazy(() => import("./screens/CourseVideos.jsx")); // Ensure this uses uppercase

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtpForm />} />
        <Route
          path="/courses/:id"
          element={<ProtectedRoute element={<CourseDets />} />}
        />
        {/* <Route
          path="/videos/:courseId/:outlineId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute element={<CourseVideos />} />
            </Suspense>
          }
        /> */}
        <Route
          path="/videos/:courseId/:outlineId"
          element={<ProtectedRoute element={<CourseVideos />} />}
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </>
  )
);

// Render the router
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
