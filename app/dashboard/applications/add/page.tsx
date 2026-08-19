"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createApplication } from "./actions";

export default function AddApplicationPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    jobUrl: "",
    salary: "",
    status: "Applied",
    applicationDate: "",
    notes: "",
  });

  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add Application</h1>

          <p className="mt-1 text-gray-500">
            Add a job application to your tracker.
          </p>
        </div>

        <form
           action={createApplication}
          className="rounded-xl border bg-white p-6 md:p-8"
        >

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Company */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Company *
            </label>

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Google"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Job Title */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Job Title *
            </label>

            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Software Engineer"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Location
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Bangalore"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Job URL */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Job URL
            </label>

            <input
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://company.com/jobs/..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Salary */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Salary
            </label>

            <input
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              type="text"
              placeholder="e.g. ₹12 LPA"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-black"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* Application Date */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Application Date
            </label>

            <input
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              type="date"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add interview notes, recruiter information, etc."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => router.push("/dashboard/applications")}
              className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Application
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}