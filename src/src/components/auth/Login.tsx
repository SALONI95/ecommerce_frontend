"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setUserloggedIn } from "@/src/store/slices/authSlice";
import { authService } from "@/lib/api/authService";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppStore";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  //   const router = useRouter()

  const updateStore = (data: any) => {
    console.log(data);
    dispatch(
      setUserloggedIn({
        user: data.loggedInUser,
        wishlist: data.wishlist,
        token: data.accessToken,
      })
    );

    authService.setAuthorizationHeader(data.accessToken);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const { data, success } = await authService.login({ email, password });

      if (success) {
        updateStore(data);
        navigate("/");
      }
    } else {
      const res = await authService.signup({
        fullname,
        email,
        password,
        mobileNo,
      });

      if (res.data.success) {
        updateStore(res.data.data);
        navigate("/login");
      }
    }
    // Here you would typically handle the authentication logic
    console.log(isLogin ? "Logging in" : "Signing up", {
      email,
      password,
      fullname,
    });
    // After successful auth, redirect to home page
    // router.push('/')
  };

  return (
    <>
      <h2 className="text-3xl font-serif mb-6 text-center">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                id="name"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="mobileNo">Mobile No.</Label>
              <Input
                id="mobileNo"
                type="number"
                value={mobileNo}
                onChange={(e) => setMobileNo(Number(e.target.value))}
                required
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <Label htmlFor="mobileNo">Mobile No.</Label>
          <Input
            id="mobileNo"
            type="number"
            value={mobileNo}
            onChange={(e) => setMobileNo(Number(e.target.value))}
            required
          />
        </div> */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          onClick={() => navigate("/verify-email")}
          className="text-sm text-indigo-600 hover:underline"
        >
          Forgot Password?
        </button>
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-gray-600 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </button>
      </div>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button variant="outline" className="w-full">
            <span className="sr-only">Sign in with Google</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </Button>
          <Button variant="outline" className="w-full">
            <span className="sr-only">Sign in with Facebook</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button variant="outline" className="w-full">
            <span className="sr-only">Sign in with Apple</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}
