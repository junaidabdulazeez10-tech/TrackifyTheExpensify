import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    redirect("/dashboard")
  }

  return (

    <div>
      <div className="text-center mt-50 text-7xl font-semibold">
        Take Control of Your Finances with Our Budgeting App
      </div>
      <div className="text-center mt-10 text-3xl font-semibold">
        Track your income and expenses, set monthly
        budgets, and understand your spending through
        simple charts and category breakdowns.
      </div>
      <div className="text-center mt-5 text-3xl font-semibold">
        Our app is designed to help you make informed financial 
        decisions and achieve your financial goals.
      </div>
      <div className="text-center mt-10 text-2xl">
        <Link className="border p-5 inline-block hover:scale-120 transition-transform cursor-pointer duration-200" href="/demo">Get Started With The Demo Here!</Link>
      </div>
      <div className="text-center mt-10 text-2xl">
        <Link className="border p-5 inline-block hover:scale-120 transition-transform cursor-pointer duration-200" href="/sign-up">Sign Up Here!</Link>
      </div>
      <div className="text-center mt-10 text-2xl">
        <Link className="border p-5 inline-block hover:scale-120 transition-transform cursor-pointer duration-200" href="/login">Already have an Account, Then Login Here!</Link>
      </div>
    </div>

  );
}
