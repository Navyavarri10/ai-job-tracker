import { prisma } from "@/lib/prisma";
import { updateApplication } from "../actions";

export default async function EditApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const id = params.id;

  if (!id) {
    return (
      <main className="min-h-screen bg-gray-50 p-10">
        <p className="text-red-600">Application ID is missing.</p>
      </main>
    );
  }

  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });

  if (!application) {
    return (
      <main className="min-h-screen bg-gray-50 p-10">
        <p className="text-red-600">Application not found.</p>
      </main>
    );
  }

  async function handleUpdate(formData: FormData) {
    "use server";

    await updateApplication(id, {
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      location: formData.get("location") as string,
      jobUrl: formData.get("jobUrl") as string,
      salary: formData.get("salary") as string,
      status: formData.get("status") as string,
      applicationDate: formData.get("applicationDate") as string,
      notes: formData.get("notes") as string,
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Application
          </h1>

          <p className="mt-1 text-gray-500">
            Update your job application details.
          </p>
        </div>

        <form
          action={handleUpdate}
          className="rounded-xl border bg-white p-6 md:p-8"
        >

          {/* Company */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Company
            </label>

            <input
              name="company"
              defaultValue={application.company}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          {/* Job Title */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Job Title
            </label>

            <input
              name="role"
              defaultValue={application.role}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Location
            </label>

            <input
              name="location"
              defaultValue={application.location ?? ""}
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
              type="url"
              defaultValue={application.jobUrl ?? ""}
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
              defaultValue={application.salary ?? ""}
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
              defaultValue={application.status}
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
              type="date"
              defaultValue={
                application.applicationDate
                  ? new Date(application.applicationDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
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
              rows={4}
              defaultValue={application.notes ?? ""}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-3">
            <a
              href="/dashboard/applications"
              className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}