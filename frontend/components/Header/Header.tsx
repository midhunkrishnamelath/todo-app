"use client"; // Add this to make the component a client component

import Button from "../button/Button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <header className="py-6 px-4 flex flex-wrap text-xl bg-gray-700 items-center justify-between">
      <div className="px-6 font-black">TODO App</div>
      <div className="flex flex-wrap px-6">
        <Button label="Login" onClick={handleLoginClick} />
        <Button label="Signup" onClick={handleSignupClick} />
      </div>
    </header>
  );
}
