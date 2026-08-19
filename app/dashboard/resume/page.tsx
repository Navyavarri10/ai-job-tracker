"use client";

import { useState } from "react";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeMatch() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please enter both your resume and job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/resume-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Resume Matcher
          </h1>

          <p className="mt-1 text-gray-500">
            Compare your resume with a job description using AI.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Resume */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold">
              Your Resume
            </h2>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={15}
              placeholder="Paste your resume text here..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Job */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold">
              Job Description
            </h2>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={15}
              placeholder="Paste the job description here..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={analyzeMatch}
          disabled={loading}
          className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume Match"}
        </button>

        {/* Results */}
        <div className="mt-8 rounded-xl border bg-white p-6 md:p-8">
          <h2 className="text-lg font-semibold">
            Match Results
          </h2>

          {!result && !loading && (
            <p className="mt-2 text-gray-500">
              Your resume match analysis will appear here.
            </p>
          )}

          {loading && (
            <p className="mt-4 text-gray-500">
              AI is comparing your resume with the job...
            </p>
          )}

          {result && (
            <div className="mt-5 whitespace-pre-wrap leading-7 text-gray-700">
              {result}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}