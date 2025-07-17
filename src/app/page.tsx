// import { redirect } from "next/navigation";
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  // redirect("/signup");

  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  }


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4">Welcome to Planify</h1>
        <button
          onClick={handleGoToDashboard}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </button>{" "}
      </main>
    </div>
  );
}
