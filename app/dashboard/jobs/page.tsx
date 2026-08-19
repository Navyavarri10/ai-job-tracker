"use client";

import { useState } from "react";

const jobs = [
  {
    company: "Google",
    role: "Software Engineer",
    location: "Bangalore",
    type: "Full-time",
  },
  {
    company: "Microsoft",
    role: "Software Development Engineer",
    location: "Hyderabad",
    type: "Full-time",
  },
  {
    company: "Amazon",
    role: "Machine Learning Engineer",
    location: "Bangalore",
    type: "Full-time",
  },
  {
    company: "Adobe",
    role: "Frontend Developer",
    location: "Noida",
    type: "Full-time",
  },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const text =
      `${job.company} ${job.role} ${job.location}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="mt-1 text-gray-500">
            Discover jobs and track opportunities.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies or locations..."
            className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-black"
          />
        </div>

        {/* Jobs */}
        <div className="grid gap-5 md:grid-cols-2">

          {filteredJobs.map((job) => (
            <div
              key={`${job.company}-${job.role}`}
              className="rounded-xl border bg-white p-6"
            >
              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-lg font-semibold">
                    {job.role}
                  </h2>

                  <p className="mt-1 font-medium">
                    {job.company}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {job.location} · {job.type}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                  {job.type}
                </span>

              </div>

              <div className="mt-6 flex gap-3">

                <a
                  href="/dashboard/applications/add"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Track Application
                </a>

                <a
                  href="/dashboard/ai-tools"
                  className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Analyze
                </a>

              </div>
            </div>
          ))}

        </div>

        {filteredJobs.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
            No jobs found.
          </div>
        )}

      </div>
    </main>
  );
}