import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    const prompt = `
Analyze the following job description for a job applicant.

Return a clear analysis with:

1. Required technical skills
2. Required soft skills
3. Experience requirements
4. Main responsibilities
5. Important keywords for ATS
6. A short summary

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
  console.error("Gemini error:", error);

  return NextResponse.json(
    {
      error:
        "Gemini is temporarily unavailable. Please try again in a few seconds.",
    },
    { status: 503 }
  );
}
}
