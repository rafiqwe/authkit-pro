export function credentialsForm() {
  const credentialContent = `
import React from "react";
const Credentials = () => {
  return (
    <div className="w-full h-full text-black">
      <form action="" className="w-full h-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          className="w-full text-[16px] h-10 border-none outline-none px-4 py-3 bg-white/90 rounded-lg text-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full h-10 border-none outline-none px-4 py-3 bg-white/90 rounded-lg text-[16px] text-gray-500"
        />
        <button
          type="submit"
          className="w-full h-10 bg-black font-semibold rounded-lg text-white cursor-pointer"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default Credentials;

    `;
  return credentialContent;
}
