"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createApplication(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const jobUrl = formData.get("jobUrl") as string;
  const salary = formData.get("salary") as string;
  const status = formData.get("status") as string;
  const applicationDate = formData.get("applicationDate") as string;
  const notes = formData.get("notes") as string;

  if (!company || !role) {
    throw new Error("Company and Job Title are required.");
  }

  const session = await auth();

    if (!session?.user?.email) {
    throw new Error("You must be logged in.");
    }

    const user = await prisma.user.upsert({
    where: {
        email: session.user.email,
    },
    update: {
        name: session.user.name,
    },
    create: {
        name: session.user.name,
        email: session.user.email,
    },
    });

  await prisma.application.create({
    data: {
      company,
      role,
      location: location || null,
      jobUrl: jobUrl || null,
      salary: salary || null,
      status: status || "Applied",
      applicationDate: applicationDate
        ? new Date(applicationDate)
        : null,
      notes: notes || null,
      userId: user.id,
    },
  });
  redirect("/dashboard/applications");
}