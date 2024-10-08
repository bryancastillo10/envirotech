import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { setCurrentUser } from "../redux/global";
import { useAppDispatch } from "../redux/Provider";
import { useSignUpMutation } from "../api/auth";
import { AuthError } from "../types/auth";

import { toast } from "sonner";
import { AuthNavbar, AuthFiller, AuthForm } from "../ui";
import { Input } from "../reusables";
import Sponsor from "../landingpage/Sponsor";
import { User, Envelope,Key,ShieldCheck } from "@phosphor-icons/react";

const SignUp = () => {
  // Hooks
  const [signUp, {isLoading}] = useSignUpMutation(); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    username: "",
    email:"",
    password: "",
    confirmPassword: "",
  });

  // Handling Form
  const handleSignUpInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData({...signUpData, [e.target.id]:e.target.value});
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signUp(signUpData).unwrap();
      
      if (res.user) {
        dispatch(setCurrentUser(res.user));
        toast.success(res.message || "Sign up successful");
        navigate("/user");
      } else {
        throw new Error("User data not found in response");
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const apiError = error as AuthError;
        if (apiError.status === 400 && apiError.data?.error) {
          toast.error(apiError.data.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Sign up error:", error);
    }
  };

  // JSX Elements
  const header = (
    <h1 className="p-2 text-2xl font-semibold text-center">Why Do You Need to Create an Account?</h1>
  );

  const featureList = (  
      <ul className="text-center lg:text-left lg:list-disc space-y-2 text-sm xl:text-base">
        <li>Broaden your knowledge about the environment</li>
        <li>Consult with credible experts</li>
        <li>Access Exclusive Resources</li>
        <li>Join the community</li>
      </ul>
  );

    const formHeader= (
      <>
      Get Started at <span className="text-secondary font-bold">EnviroTech</span>
      </>
    );

    const formBody = (
      <>
        <Input 
          id="username"  
          type="text" 
          value={signUpData.username}
          label="Username"
          disabled={isLoading}
          onChange={handleSignUpInput}  
          icon={User}
          validationMessage="Greater than 5 alphanumeric characters"
          />

        <Input 
          id="email" 
          type="email" 
          value={signUpData.email}
          label="Email"
          disabled={isLoading}
          onChange={handleSignUpInput} 
          icon={Envelope}
          validationMessage="Valid email address (eg. envirotech@domain.com)"
        />

        <Input 
          id="password" 
          type="password"
          value={signUpData.password} 
          label="Password"
          disabled={isLoading}
          onChange={handleSignUpInput}   
          icon={Key} 
          isPassword
          validationMessage="At least one uppercase, lowercase, and a numeric character"
        />

        <Input 
          id="confirmPassword" 
          type="password" 
          value={signUpData.confirmPassword}
          label="Confirm Password"
          disabled={isLoading}
          onChange={handleSignUpInput}  
          icon={ShieldCheck} 
          isPassword
          validationMessage="Retype password for validation"
        />
      </>
    );

  return (
    <section>
    {/* Nav Header */}
    <AuthNavbar/>


    <main className="mt-10 grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center overflow-x-hidden">
        <AuthFiller
          header={header}
          contents={featureList}
          firstImage="/images/signUpImg1.png"
          secondImage="/images/signUpImg2.png"
        />      
   
        <AuthForm
            formHeader={formHeader}
            formBody={formBody}
            onSubmit={handleSubmit}
            loading={isLoading}
            isSignUp
        />
    </main>

    {/* Sponsor Footer */}
    <Sponsor
      header="Trusted by World Class Organizations"
      backgroundClass="bg-secondary"
    />
    </section>
  )
}

export default SignUp;
