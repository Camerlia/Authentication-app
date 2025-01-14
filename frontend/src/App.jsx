import { Navigate, Route, Routes } from "react-router-dom";
import { FloatingShpe } from "./components/FloatingShpe";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

//protected authenticated routes
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

//redirected authenticated user o the home page
const RedirectedAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" relative />;
  }
  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen  bg-gradient-to-bl from-slate-950 via-cyan-900 to-blue-950 text-white flex items-center justify-center relative overflow-hidden">
      <FloatingShpe
        color="bg-cyan-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShpe
        color="bg-blue-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShpe
        color=" bg-slate-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <FloatingShpe
        color=" bg-orange-500"
        size="w-32 h-32"
        top="60%"
        left="60%"
        delay={5}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectedAuthenticatedUser>
              <SignUpPage />
            </RedirectedAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectedAuthenticatedUser>
              <LoginPage />
            </RedirectedAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectedAuthenticatedUser>
              <ForgotPassword />
            </RedirectedAuthenticatedUser>
          }
        />
        <Route 
          path="/reset-password"
          element={<RedirectedAuthenticatedUser>
            <ResetPassword />
          </RedirectedAuthenticatedUser>}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
