import { auth } from "@/server/auth";
import { GetStartedWrapper } from "./wrapper";
import { api } from "@/trpc/server";

export default async function GetStartedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const user = session?.user ? await api.user.getUser() : undefined;

  return (
    <GetStartedWrapper userData={user} serverSession={session}>
      {children}
    </GetStartedWrapper>
  );
}
