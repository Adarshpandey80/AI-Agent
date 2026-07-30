"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [roles, setRoles] = useState("");
  const [skills, setSkills] = useState("");
  const [countries, setCountries] = useState("");
  const [experience, setExperience] = useState("");
  const [jobTypes, setJobTypes] = useState("");

  async function saveProfile() {
    const profile = {
      roles: roles.split(",").map((item) => item.trim()),
      skills: skills.split(",").map((item) => item.trim()),
      countries: countries.split(",").map((item) => item.trim()),
      experience,
      jobTypes: jobTypes.split(",").map((item) => item.trim()),
    };

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await res.json();

    console.log(data);

    alert("Profile Saved");
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-6 rounded-lg border p-8">

      <h1 className="text-3xl font-bold">
        Job Profile
      </h1>

      <div>
        <label>Preferred Roles</label>

        <input
          className="mt-2 w-full rounded border p-2"
          placeholder="Frontend Developer, Full Stack Developer"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
        />
      </div>

      <div>
        <label>Skills</label>

        <textarea
          className="mt-2 h-40 w-full rounded border p-2"
          placeholder="React, Next.js, Node.js..."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div>
        <label>Preferred Countries</label>

        <input
          className="mt-2 w-full rounded border p-2"
          placeholder="Germany, Netherlands, Sweden"
          value={countries}
          onChange={(e) => setCountries(e.target.value)}
        />
      </div>

      <div>
        <label>Experience</label>

        <input
          className="mt-2 w-full rounded border p-2"
          placeholder="Entry Level"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <div>
        <label>Job Types</label>

        <input
          className="mt-2 w-full rounded border p-2"
          placeholder="Full Time, Internship"
          value={jobTypes}
          onChange={(e) => setJobTypes(e.target.value)}
        />
      </div>

      <button
        onClick={saveProfile}
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        Save Profile
      </button>

    </div>
  );
}