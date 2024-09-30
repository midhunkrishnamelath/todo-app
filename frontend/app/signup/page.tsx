"use client"; // Add this to make the component a client component

import { ChangeEvent, FormEvent, useState } from "react";
import { signup } from "../../api/auth";
import { Popover } from "antd";

const defaultFormData = {
  name: "",
  email: "",
  password: "",
  projects: []
};

export default function Signup() {
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      let res = await signup(formData);
      console.log({res})
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
        <div className="font-bold text-4xl p-2 m-4">SignUp</div>
        <form className="w-[20rem]" onSubmit={handleSubmit}>
          <input
            name="name"
            className="w-full [border:none] [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-m text-gray-100"
            placeholder="Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="email"
            className="w-full [border:none] [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-m text-gray-100"
            placeholder="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            name="password"
            className="w-full [border:none] [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-m text-gray-100"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            minLength={6}
          />
          <button
            type="submit"
            className="p-2 m-4 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
