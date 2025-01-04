import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Mail}
            value={user}
            placeholder="Email Address"
            type="email"
            onChange={(e) => setUser(e.target.value)}
          />

          <Input
            icon={Lock}
            value={password}
            placeholder="Email Address"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-cyan-400 hover:underline'>
							Forgot password?
						</Link>
					</div>
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-cyan-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don&apos;t have an account?{" "}
					<Link to='/signup' className='text-cyan-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
    </motion.div>
  );
};

export default LoginPage;