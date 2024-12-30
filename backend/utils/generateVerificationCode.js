export const generateVerificationCode=()=>{
    Math.round(100000 + Math.random() * 900000).toString();
}