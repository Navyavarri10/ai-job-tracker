"use client";

export default function EditButton({
  id,
}: {
  id: string;
}) {
  return (
    <a
      href={`/dashboard/applications/edit?id=${id}`}
      className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
    >
      Edit
    </a>
  );
}