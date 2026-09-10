import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function MainLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
}
