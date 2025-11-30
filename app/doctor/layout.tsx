import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("doctor_session");

  if (!session) {
    redirect("/login?redirect=/doctor");
  }

  return <>{children}</>;
}

