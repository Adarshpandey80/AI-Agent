"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [roles, setRoles] = useState("");
  const [skills, setSkills] = useState("");
  const [countries, setCountries] = useState("");
  const [experience, setExperience] = useState("");
  const [jobTypes, setJobTypes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function saveProfile() {
    setSaving(true);
    setError("");
    setMessage("");

    const profile = {
      fullName,
      email,
      linkedin,
      github,
      portfolio,
      roles: roles.split(",").map((item) => item.trim()),
      skills: skills.split(",").map((item) => item.trim()),
      countries: countries.split(",").map((item) => item.trim()),
      experience,
      jobTypes: jobTypes.split(",").map((item) => item.trim()),
    };

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.message || "Unable to save profile.");
      }

      console.log(data);
      setMessage("Profile saved successfully.");
    } catch (saveError: any) {
      setError(saveError?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl space-y-8 px-4 pb-16">
      <section className="overflow-hidden rounded-4xl border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              Profile Builder
            </span>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Build a profile the search engine can actually use.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Add your identity, links, and job preferences once. The dashboard will use this profile to find and score matching roles.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-2">Required identity fields</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Preferred roles</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Search-ready profile</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-2xl shadow-slate-950/20">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
              Saved profile
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-slate-400">Status</p>
                <p className="mt-1 text-lg font-semibold text-white">Ready for search</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-slate-400">Platforms</p>
                  <p className="mt-1 text-lg font-semibold text-white">4</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-slate-400">Match signal</p>
                  <p className="mt-1 text-lg font-semibold text-white">High</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Identity</h2>
            <p className="mt-1 text-sm text-slate-500">Required to create and store your profile.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Full name</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="Adarsh Pandey"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="adarsh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-700">LinkedIn</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="linkedin.com/in/yourname"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">GitHub</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="github.com/yourname"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Portfolio</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="portfolio.com"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Job preferences</h2>
            <p className="mt-1 text-sm text-slate-500">These preferences power the search and scoring flow.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Preferred roles</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              placeholder="Frontend Developer, Full Stack Developer"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Skills</label>
            <textarea
              className="mt-2 h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              placeholder="React, Next.js, Node.js..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Preferred countries</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="Germany, Netherlands, Sweden"
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Experience</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                placeholder="Entry Level"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Job types</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              placeholder="Full Time, Internship"
              value={jobTypes}
              onChange={(e) => setJobTypes(e.target.value)}
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          <button
            onClick={saveProfile}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving profile..." : "Save Profile"}
          </button>
        </div>
      </section>

      <p className="text-sm text-slate-500">
        Tip: create a profile first, then use Search Jobs from the navbar to populate the dashboard.
      </p>
    </div>
  );
}
