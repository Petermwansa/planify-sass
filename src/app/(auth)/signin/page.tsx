"use client";

import { useEffect, useState } from "react";
import { login, googleLogin, forgotPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../UI/Button/Button";
import Image from "next/image";
import "../../../styles/globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    const result = await forgotPassword(email);
    if (result.success) {
      setSuccessMsg(result.message);
      setError(null);
    } else {
      setError(result.message);
      setSuccessMsg(null);
    }
  };

  // ✅ Wait for Firebase to confirm user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <main className="flex bg-cyan-50 h-screen">
      <div className="left_auth">
        <h1 className="logo">Planify.Ai</h1>
        {/* <p className="auth_p">Your Content Creation Ai assistant</p> */}
      </div>
      <div className="right_auth">
        <div className="create-top">
          <h1 className="text-xl">Sign In</h1>
          <p className="text-black">You can activate a 14-day free trial</p>
        </div>
        <form
          onSubmit={handleLogin}
          className=" sign-form bg-[#aad5fb] ounded-[50px] p-5 max-w-[600px] mx-auto "
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}

          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium">
              Please Enter Your Email
            </label>{" "}
            <input
              id="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="passowrd" className="block text-sm font-medium">
              Please Enter Your Password
            </label>{" "}
            <input
              id="password"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Sign In</Button>

          <div className="socials-text">
            <p>Or sign in with</p>
          </div>
          <div className="create-socials">
            <button
              type="button"
              onClick={async () => {
                try {
                  await googleLogin();
                  router.push("/"); // Redirect after Google signup
                } catch (error) {
                  setError("Google signup failed. Please try again.");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-100"
            >
              <Image
                src="/images/google.png"
                alt="Google icon for signing up with Google"
                width={20}
                height={20}
              />
            </button>
            {/* <Link href="#">
              <Image
                src="/images/facebook.png"
                alt="Google icon for signing up with facebook"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/apple.png"
                alt="Google icon for signing up with apple"
                width={20}
                height={20}
              />
            </Link> */}
          </div>
        </form>
        <div className="reset">
        <h1>Did you forget your password?</h1>
        <Link href={"/reset"} className="reset_link">Reset my Password</Link>
        </div>
        <div className="bottom-create">
          <p>
            You don&apos;t have an account yet?{" "}
            <Link href="/signup" className="link">
              Sign up
            </Link>
          </p>
          <Link href="#" className="link">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </main>
  );
}
