import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your JobTrack AI account.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 md:p-8">

          <h2 className="text-lg font-semibold">
            Account
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium">
                {user?.name || session.user.name || "User"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-medium">
                {user?.email || session.user.email}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}