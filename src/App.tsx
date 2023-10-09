import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { CourseDetail } from "./components/CourseDetail";
import { Auth } from "./components/Auth";
import UserCertificates from "./components/UserCertificates";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <Auth>
                <CourseDetail />
              </Auth>
            }
          />

          <Route
            path="/user/certificates"
            element={
              <Auth>
                <UserCertificates />
              </Auth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
