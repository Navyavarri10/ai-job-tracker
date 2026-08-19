"use client";

import { useState } from "react";

function formatText(text: string) {
  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      return <div key={index} className="h-3" />;
    }

    // Horizontal line
    if (trimmed === "---") {
      return <hr key={index} className="my-5 border-gray-200" />;
    }

    // ### Heading
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-6 mb-3 text-lg font-semibold text-gray-900"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    // ## Heading
    if (trimmed.startsWith("## ")) {
      return (
        <h3
          key={index}
          className="mt-6 mb-3 text-xl font-semibold text-gray-900"
        >
          {trimmed.replace("## ", "")}
        </h3>
      );
    }

    // Bullet points
    if (trimmed.startsWith("* ")) {
      const content = trimmed.replace("* ", "");

      return (
        <div
          key={index}
          className="mb-2 flex gap-2 text-gray-700"
        >
          <span>•</span>
          <span>{formatBoldText(content)}</span>
        </div>
      );
    }

    // Numbered points
    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <p
          key={index}
          className="mb-3 font-medium text-gray-800"
        >
          {formatBoldText(trimmed)}
        </p>
      );
    }

    // Normal paragraph
    return (
      <p key={index} className="mb-3 text-gray-700 leading-7">
        {formatBoldText(trimmed)}
      </p>
    );
  });
}

function formatBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default function AIToolsPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeJob() {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/analyze-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          : "Failed to analyze job description."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            AI Job Analyzer
          </h1>

          <p className="mt-1 text-gray-500">
            Analyze a job description and discover the skills you need.
          </p>
        </div>

        {/* Job Description */}
        <div className="rounded-xl border bg-white p-6 md:p-8">

          <label className="mb-2 block text-sm font-medium">
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={12}
            placeholder="Paste the job description here..."
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={analyzeJob}
            disabled={loading}
            className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Job Description"}
          </button>
        </div>

        {/* Results */}
        <div className="mt-8 rounded-xl border bg-white p-6 md:p-8">

          <h2 className="text-lg font-semibold">
            Analysis Results
          </h2>

          {!result && !loading && (
            <p className="mt-2 text-gray-500">
              Your AI analysis will appear here.
            </p>
          )}

          {loading && (
            <p className="mt-4 text-gray-500">
              Gemini is analyzing the job description...
            </p>
          )}

          {result && (
            <div className="mt-5">
              {formatText(result)}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}