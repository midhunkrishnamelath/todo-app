"use client"; // Add this to make the component a client component

import { login } from "../../api/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(defaultFormData);
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      let res = await login(formData.email, formData.password);
      const authHeader = `Basic ${btoa(
        `${formData.email}:${formData.password}`
      )}`;

      localStorage.setItem("authHeader", authHeader);
      localStorage.setItem("id", res.data.id);
      router.push("/projects");
    } catch (error) {
      console.log(error);
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 h-screen bg-gray-700"></div>
      <div className="w-1/2 h-screen flex flex-col items-center justify-center">
        <div className="font-bold text-4xl p-2 m-4">Login</div>
        <form className="w-[20rem]" onSubmit={handleSubmit}>
          <input
            name="email"
            className="w-full [border:none] [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-m text-gray-100"
            placeholder="Username"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            name="password"
            className="w-full [border:none] [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-m text-gray-100"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="p-2 m-4 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
