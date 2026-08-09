// agents/remoteokAgent.ts

export async function remoteokAgent(profile: any) {
  try {
    const response = await fetch(
      "https://remoteok.com/api",
      {
        headers: {
          "User-Agent": "AI-Job-Agent",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `RemoteOK API failed: ${response.status}`
      );
    }

    const data = await response.json();

    // First item from RemoteOK can contain legal/API information
    const jobs = Array.isArray(data)
      ? data.slice(1)
      : [];

    const results = jobs
      .filter((job: any) => job.position && job.url)
      .map((job: any) => ({
        company: job.company || "Unknown",
        title: job.position,
        location: job.location || "Remote",
        platform: "RemoteOK",
        url: job.url,
        salary:
          job.salary_min || job.salary_max
            ? `${job.salary_min || ""} - ${
                job.salary_max || ""
              }`
            : "",
        description: job.description || "",
      }));

    return results;

  } catch (error) {
    console.error("RemoteOK Agent Error:", error);

    return [];
  }
}