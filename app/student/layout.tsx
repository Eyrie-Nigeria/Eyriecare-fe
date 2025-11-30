import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("student_session");

  if (!session) {
    redirect("/login?redirect=/student");
  }

  return <>{children}</>;
}

