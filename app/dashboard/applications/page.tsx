import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.q || "";
  const status = params.status || "All Status";

  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const applications = user
    ? await prisma.application.findMany({
        where: {
          userId: user.id,

          ...(search
            ? {
                OR: [
                  {
                    company: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    role: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),

          ...(status !== "All Status"
            ? {
                status: status,
              }
            : {}),
        },

        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>

          <p className="mt-1 text-gray-500">
            Track and manage your job applications.
          </p>
        </div>

        <a
          href="/dashboard/applications/add"
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Application
        </a>
      </div>

      {/* Search + Filter */}
      <form
        method="GET"
        className="mb-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          name="q"
          defaultValue={search}
          placeholder="Search company or job title..."
          className="flex-1 rounded-lg border bg-white px-4 py-3 outline-none focus:border-black"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border bg-white px-4 py-3 outline-none"
        >
          <option>All Status</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* Applications */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="grid grid-cols-12 border-b bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500">
          <div className="col-span-3">Company</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Applied</div>
        </div>

        {applications.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-500">
            No applications found.
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application.id}
              className="grid grid-cols-12 items-center border-b px-6 py-5 last:border-b-0 hover:bg-gray-50"
            >
              <div className="col-span-3 font-semibold">
                {application.company}
              </div>

              <div className="col-span-3 text-sm text-gray-600">
                {application.role}
              </div>

              <div className="col-span-2 text-sm text-gray-600">
                {application.location || "-"}
              </div>

              <div className="col-span-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    application.status === "Interview"
                      ? "bg-blue-100 text-blue-700"
                      : application.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : application.status === "Offer"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {application.status}
                </span>
              </div>

                <div className="col-span-2 flex items-center gap-2">
                    <EditButton id={application.id} />

                    <DeleteButton id={application.id} />
                </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}