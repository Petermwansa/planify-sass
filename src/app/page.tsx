// import { redirect } from "next/navigation";
"use client";

import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";

export default function Home() {
  // redirect("/signup");

  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const name = "Harriet";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="logo">Planify.Ai</h1>
        <h1 className="welcome">Welcome back {name}</h1>
        <button onClick={handleGoToDashboard} className="landing_button">
          Go to my Dashboard
        </button>{" "}
        <LogoutButton />
      </main>
    </div>
  );
}
