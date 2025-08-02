"use client";

import { useEffect, useState } from "react";
import { googleLogin, signup } from "@/services/authService";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

import Link from "next/link";
import Button from "../../UI/Button/Button";
import Image from "next/image";
import "../../../styles/globals.css";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
    } catch (err: any) {
      setError("Signup failed. Please try again.");
    }
  };

  // ✅ Wait for Firebase to confirm user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in", user);
        router.push("/");
      } else {
        console.log("There is no active Token");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <main className="flex bg-cyan-50 h-screen">
      <div className="left_auth">
        <h1 className="logo">Planify.Ai</h1> <br />
        {/* <p className="auth_p">Your Content Creation Ai assistant</p> */}
      </div>
      <div className="right_auth">
        <div className="create-top">
          <h1 className="text-xl">Create an Account</h1>
          <p className="text-black">Sign up and get a 14-day free trial</p>
        </div>
        <form
          onSubmit={handleSignup}
          className=" sign-form bg-[#aad5fb] ounded-[50px] p-5 max-w-[600px] mx-auto "
        >
          {error && <p className="text-red-500">{error}</p>}

          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium">
              Please Enter Your Name
            </label>{" "}
            <input
              id="name"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="password" className="block text-sm font-medium">
              Please Create a Password
            </label>{" "}
            <input
              id="password"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="input-group">
            <label
              htmlFor="repeatpassword"
              className="block text-sm font-medium"
            >
              Repeat Password
            </label>{" "}
            <input
              id="repeatpassword"
              type="passowrd"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div> */}
          <Button type="submit">Sign up</Button>
          <div className="socials-text">
            <p>Or sign up with</p>
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

        <div className="bottom-create">
          <p>
            Do you already have an account yet?{" "}
            <Link href="/signin" className="link">
              Sign in
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
