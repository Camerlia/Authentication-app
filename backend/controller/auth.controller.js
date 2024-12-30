import { User } from "../models/user.module.js";
import bcryptjs from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("Al fields are required");
    }
    const userAllReadyExist = await User.findOne({ email });
    console.log("userAllReadyExist", userAllReadyExist)
    if (userAllReadyExist) {
      return res
        .status(400)
        .json({ succes: false, message: "User Already Exist" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();
    //jwt
    generateTokenAndSetCookies(res, user._id);
    sendVerificationEmail(user.email, verificationToken)
    res.status(
      (201).json({
        succes: true,
        message: "User created successfully",
        user:{
            ...user._doc,
            password: undefined,
        },
      })
    );
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
};
export const verifyEmail= async(req, res)=>{
  const {code} = req.body;
  try{
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}

    })
    if(!user){
      return res.status(400).json({succes:false, message: "Invalid or expired verification code"})
    }
    user.isVerified = true
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save()

    await sendWelcomeEmail(user.email, user.name)
  }catch{}
  const {email} = req.body
}

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
