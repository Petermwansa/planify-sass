import Link from "next/link";
import Button from "../UI/Button/Button";
import Image from "next/image";
import "../../styles/globals.css";

export default function SignupPage() {
  return (
    <main className="flex bg-cyan-50 h-screen">
      <div className="w-1/2 bg-teal-600 flex items-center  flex-col justify-center custom-top-right-rounded">
        <h1 className="text-xl">Planify.Ai</h1> <br />
        <p className="text-white">Your Content Creation Ai assistant</p>
      </div>
      <div className="w-1/2 bg-cyan-50 flex items-center text-black flex-col create-div">
        <div className="create-top">
          <h1 className="text-xl">Create an Account</h1>
          <p className="text-black">Sign up and get a 14-day free trial</p>
        </div>
        <form className="bg-[#f0f8ff] rounded-[20px] p-5 max-w-[600px] mx-auto">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Name
            </label>{" "}
            <input
              id="name"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>{" "}
            <input
              id="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="passowrd" className="block text-sm font-medium">
              Password
            </label>{" "}
            <input
              id="password"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
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
          </div>
          <Button>Sign up</Button>
          <div className="socials-text">
            <p>Or sign up with</p>
          </div>
          <div className="create-socials">
            <Link href="#">
              <Image
                src="/images/google.png"
                alt="Google icon for signing up with google"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#">
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
            </Link>
          </div>
        </form>

        <div className="bottom-create">
          <p>
            Already have an account yet?{" "}
            <Link href="#" className="link">
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
