export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between border-b bg-white px-8 py-4">
        <h1 className="text-2xl font-bold">JobTrack AI</h1>

        <div className="flex gap-4">
          <a href="/api/auth/signin">
            Login
          </a>

          <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
            Get Started
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-8 py-24 text-center">
        <h2 className="text-5xl font-bold tracking-tight">
          Your AI-Powered
          <br />
          Job Application Tracker
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Track applications, analyze your resume, match jobs with AI,
          and manage your entire job search from one dashboard.
        </p>

        <button className="mt-8 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
          Start Tracking Jobs
        </button>
      </section>
    </main>
  );
}