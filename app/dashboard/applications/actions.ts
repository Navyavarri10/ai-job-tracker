"use server";

import { prisma } from "@/lib/prisma";

export async function deleteApplication(id: string) {
  await prisma.application.delete({
    where: {
      id,
    },
  });
}

export async function updateApplication(
  id: string,
  data: {
    company: string;
    role: string;
    location: string;
    jobUrl: string;
    salary: string;
    status: string;
    applicationDate: string;
    notes: string;
  }
) {
  await prisma.application.update({
    where: {
      id,
    },
    data: {
      company: data.company,
      role: data.role,
      location: data.location || null,
      jobUrl: data.jobUrl || null,
      salary: data.salary || null,
      status: data.status,
      applicationDate: data.applicationDate
        ? new Date(data.applicationDate)
        : null,
      notes: data.notes || null,
    },
  });
}