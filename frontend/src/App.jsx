import {  Route, Routes } from "react-router-dom"
import { FloatingShpe } from "./components/FloatingShpe"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage"
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-bl from-slate-950 via-cyan-900 to-blue-950 text-white flex items-center justify-center relative overflow-hidden">
      <FloatingShpe color="bg-cyan-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShpe color="bg-blue-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShpe color=" bg-slate-500" size="w-32 h-32" top="40%" left="-10%" delay={2}/>
      <FloatingShpe color=" bg-orange-500" size="w-32 h-32" top="60%" left="60%" delay={5}/>
      <Routes>
        <Route path="/" index />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
