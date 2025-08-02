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
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const router = useRouter();

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

  return (
    <main className="flex bg-cyan-50 h-screen">
      <div className="left_auth">
        <h1 className="logo">Planify.Ai</h1>
        {/* <p className="auth_p">Your Content Creation Ai assistant</p> */}
      </div>
      <div className="right_auth">
        <div className="create-top-reset">
          <h1 className="text-xl">Reset Password</h1>
        </div>
        <form
          onSubmit={handleForgotPassword}
          className=" sign-form bg-[#aad5fb] ounded-[50px] p-5 max-w-[600px] mx-auto "
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}

          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>{" "}
            <input
              id="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Reset Password</Button>

        </form>
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
