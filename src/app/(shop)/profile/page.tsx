import { auth } from "@/auth.config";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title
        title="Perfil" />

      <pre>
        {
          JSON.stringify(session.user, null, 2)

        }
      </pre>

      <h3 className="text-red-500 text-xl">{session.user.role}</h3>
    </>
  )
}
