import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DemoPage from "./demoPage";

export default async function Demo() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    redirect("/dashboard")
  }

  return (
    <>
     <DemoPage />
    </>
  );
}
