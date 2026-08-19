import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AnalyticsPage() {
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
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  const total = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const interviewRate =
    total > 0 ? Math.round((interviews / total) * 100) : 0;

  const offerRate =
    total > 0 ? Math.round((offers / total) * 100) : 0;

  const rejectionRate =
    total > 0 ? Math.round((rejected / total) * 100) : 0;

  const stats = [
    { title: "Total Applications", value: total },
    { title: "Interviews", value: interviews },
    { title: "Offers", value: offers },
    { title: "Rejected", value: rejected },
  ];

  const statusData = [
    { label: "Applied", value: applied },
    { label: "Interview", value: interviews },
    { label: "Offer", value: offers },
    { label: "Rejected", value: rejected },
  ];

  const maxValue = Math.max(...statusData.map((item) => item.value), 1);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Analytics
          </h1>

          <p className="mt-1 text-gray-500">
            Understand your job search performance.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6"
            >
              <p className="text-sm text-gray-500">
                {stat.title}
              </p>

              <p className="mt-2 text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Rates */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-gray-500">
              Interview Rate
            </p>

            <p className="mt-2 text-3xl font-bold">
              {interviewRate}%
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-gray-500">
              Offer Rate
            </p>

            <p className="mt-2 text-3xl font-bold">
              {offerRate}%
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-gray-500">
              Rejection Rate
            </p>

            <p className="mt-2 text-3xl font-bold">
              {rejectionRate}%
            </p>
          </div>

        </div>

        {/* Status Chart */}
        <div className="rounded-xl border bg-white p-6 md:p-8">

          <h2 className="mb-8 text-lg font-semibold">
            Applications by Status
          </h2>

          <div className="space-y-6">
            {statusData.map((item) => (
              <div key={item.label}>

                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    {item.label}
                  </span>

                  <span className="text-gray-500">
                    {item.value}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-gray-100">
                  <div
                    className="h-3 rounded-full bg-black"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                    }}
                  />
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}