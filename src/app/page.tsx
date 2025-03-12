import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen items-center justify-center bg-background text-2xl">
        test
      </main>
    </HydrateClient>
  );
}
