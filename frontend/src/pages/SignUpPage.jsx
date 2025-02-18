import { motion } from "framer-motion";
import Input from "../components/Input";
import { useState } from "react";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../stores/authStore";


const SignUpPage = () => {
 

  const navigate = useNavigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore()

 async function handleSubmit(e) {
    e.preventDefault();
    try{
      await signup(email, password, name)
      navigate("/verify-email")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <motion.div
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <PasswordStrengthMeter password={password} />
          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-cyan-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-slate-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
         Already have an account?{" "}
         <Link to="/login" className="text-cyan-40 hover:underline">
          Login
         </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
