import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        {
          error: "Resume and job description are required.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert technical recruiter.

Compare the candidate's resume with the job description.

Return the analysis in this exact structure:

### Match Score
Give a percentage from 0 to 100.

### Skills You Have
List the important skills from the job description that appear in the resume.

### Missing Skills
List important job requirements that are missing from the resume.

### Experience Match
Explain whether the candidate's experience matches the role.

### ATS Keywords
List important keywords the candidate should consider including.

### Recommendations
Give 3-5 specific recommendations to improve the candidate's chances.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error("Resume match error:", error);

    return NextResponse.json(
      {
        error:
          "Gemini is temporarily unavailable. Please try again.",
      },
      { status: 503 }
    );
  }
}