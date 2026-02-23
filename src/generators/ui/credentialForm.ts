export function credentialsForm() {
  const credentialContent = `
"use client";
  
import React, { useState } from "react";
interface CredentialsFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    console.log("Submitted:", { email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/90 rounded-xl shadow-md text-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-[16px] h-10 px-4 py-3 bg-white/90 rounded-lg text-gray-700 border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
          required
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-[16px] h-10 px-4 py-3 bg-white/90 rounded-lg text-gray-700 border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full h-10 bg-black font-semibold rounded-lg text-white hover:bg-gray-900 transition-colors"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default CredentialsForm;

    `;
  return credentialContent;
}
