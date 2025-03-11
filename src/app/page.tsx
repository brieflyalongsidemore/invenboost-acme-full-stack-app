import Link from "next/link";

import { LatestPost } from "@/app/components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen items-center justify-center bg-background text-2xl">
        test
      </main>
    </HydrateClient>
  );
}
