import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";


export default async function Dashboard() {
  // Get the demo user
  const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  // Get all applications for this user
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

  // Calculate dashboard statistics
  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Applications",
      value: totalApplications,
    },
    {
      title: "Interviews",
      value: interviews,
    },
    {
      title: "Offers",
      value: offers,
    },
    {
      title: "Rejected",
      value: rejected,
    },
  ];

  // Show only the 5 most recent applications
  const recentApplications = applications.slice(0, 5);
  const today = new Date();

  const activityData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - (6 - index));

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const count = applications.filter((application) => {
      const createdAt = new Date(application.createdAt);

      return createdAt >= startOfDay && createdAt <= endOfDay;
    }).length;

    return {
      date,
      count,
    };
  });

    const maxActivity = Math.max(
    ...activityData.map((item) => item.count),
    1
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-white p-6 md:block">
        <h1 className="mb-10 text-2xl font-bold">JobTrack AI</h1>

        <nav className="space-y-2">
          <div className="rounded-lg bg-black px-4 py-3 text-white">
            Dashboard
          </div>

          <a
            href="/dashboard/applications"
            className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            Applications
          </a>

          <a
            href="/dashboard/jobs"
            className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            Jobs
          </a>

          <a
            href="/dashboard/resume"
            className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            Resume
          </a>

          <a
            href="/dashboard/ai-tools"
            className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            AI Tools
          </a>

          <a
            href="/dashboard/analytics"
            className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            Analytics
          </a>

          <a
            href="/dashboard/settings"
            className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            Settings
          </a>

<LogoutButton />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Good morning 👋</h2>
            <p className="mt-1 text-gray-500">
              Here's your job search overview.
            </p>
          </div>

          <a
            href="/dashboard/applications/add"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
            + Add Application
            </a>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6"
            >
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Application Activity */}
        <div className="mb-8 rounded-xl border bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">
            Application Activity
          </h3>

          <div className="flex h-48 items-end justify-between gap-3">
  {activityData.map((item, index) => {
    const height =
      item.count === 0
        ? 4
        : (item.count / maxActivity) * 100;

    return (
      <div
        key={index}
        className="flex h-full w-full items-end"
      >
        <div
          className="w-full rounded-t-md bg-black"
          style={{ height: `${height}%` }}
          title={`${item.count} application${
            item.count === 1 ? "" : "s"
          }`}
        />
      </div>
    );
  })}
</div>

<div className="mt-3 flex justify-between text-xs text-gray-400">
  {activityData.map((item, index) => (
    <span key={index}>
      {item.date.toLocaleDateString("en-US", {
        weekday: "short",
      })}
    </span>
  ))}
</div>

          <div className="mt-3 flex justify-between text-xs text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Recent Applications
            </h3>

            <button className="text-sm font-medium text-gray-600 hover:text-black">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold">
                    {application.company}
                  </p>

                  <p className="text-sm text-gray-500">
                    {application.role}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  {application.applicationDate
                    ? new Date(
                        application.applicationDate
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "-"}
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}