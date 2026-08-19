"use client";

import { deleteApplication } from "./actions";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    await deleteApplication(id);

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border px-3 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}