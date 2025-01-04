/* eslint-disable for-direction */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const verificationCode = code.join("");
    alert(`verification code was submitted ${verificationCode}`)
  }

  function handleChange(index, value){
    const newCode = [...code];
    //handle passed content
    if(value > 1){
        const postedCode = newCode.slice(0, 6).split('');
        for(let i = 0; i < 6; i++){
            newCode[i] = postedCode[i] || ""
        }
        setCode(newCode);

        const lastFilledIndex = newCode.findLastIndex((digit)=> digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
        inputRefs.current[focusIndex].focus()
    }else{
        newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
    }
  }
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
    }
};

useEffect(()=>{
    if(code.every(digit => digit !== '')){
        handleSubmit(new Event("submit"))
    }
},[code])
  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between"></div>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;