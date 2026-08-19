"use client";

import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    startTransition(async () => {
      await fetch("/api/auth/signout", {
        method: "POST",
      });

      window.location.href = "/";
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="w-full rounded-lg px-4 py-3 text-left text-gray-600 hover:bg-gray-100 disabled:opacity-50"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}