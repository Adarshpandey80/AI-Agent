export async function remoteokAgent(profile: any) {
  try {
    const apiUrl = process.env.REMOTEOK_API_URL;

    if (!apiUrl) {
      throw new Error("REMOTEOK_API_URL is not configured");
    }

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "AI-Job-Agent",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `RemoteOK API failed: ${response.status}`
      );
    }

    const data = await response.json();

    const jobs = Array.isArray(data)
      ? data.slice(1)
      : [];

    return jobs
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

  } catch (error) {
    console.error("RemoteOK Agent Error:", error);
    return [];
  }
}