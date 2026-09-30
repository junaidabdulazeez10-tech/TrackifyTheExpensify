"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if(!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const { error } = await authClient.signIn.email({
      email, password
    });

    if (error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/dashboard");
  }
  return (
    <div className="items-center justify-center flex">
      <form className="w-[520px] p-8 rounded-2xl flex flex-col h-[400px]" onSubmit={handleSubmit}>
        <h1 className="text-8xl font-semibold text-center mb-20">
          Login
        </h1>
        <input placeholder="Email" type="email" className="p-3 rounded-lg border mb-10 hover:opacity-70 transition-opacity duration-200" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" className="p-3 rounded-lg border mb-10 hover:opacity-70 transition-opacity duration-200" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className="text-[#ff036c] text-center mb-5 text-xl">{error}</p>
        <button type="submit" className="p-3 rounded-lg bg-green-500 text-white hover:bg-green-900 transition-colors duration-200">
          Login
        </button>
      </form>
    </div>
  )
}