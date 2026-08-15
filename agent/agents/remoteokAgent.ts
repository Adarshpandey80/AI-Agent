

export async function remoteokAgent(profile: any) {
  const Api = process.env.REMOTEOK_API_URL || "https://remoteok.com/api";
  try {
    const roles = profile.roles || [];

    const response = await fetch(Api, {
      headers: {
        "User-Agent": "AI-Job-Agent/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`RemoteOK API failed: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    const jobs = data
      .slice(1) // RemoteOK API first item contains metadata
      .filter((job: any) => {
        if (!job?.id || !job?.url || !job?.position) {
          return false;
        }

        // If profile roles exist, keep relevant jobs
        if (roles.length === 0) {
          return true;
        }

        const text = `
          ${job.position || ""}
          ${job.description || ""}
          ${(job.tags || []).join(" ")}
        `.toLowerCase();

        return roles.some((role: string) =>
          text.includes(role.toLowerCase())
        );
      })
      .map((job: any) => ({
        externalId: `remoteok-${job.id}`,

        company: job.company || "Unknown",

        title: job.position || "Unknown",

        location: job.location || "Remote",

        platform: "RemoteOK",

        url: job.url,

        salary:
          job.salary_min || job.salary_max
            ? `${job.salary_min || ""} - ${job.salary_max || ""}`
            : "",

        description: job.description || "",

        tags: job.tags || [],

        score: undefined,

        reason: "",
      }));

    // Remove duplicate URLs
    const uniqueJobs = Array.from(
      new Map(
        jobs.map((job: any) => [job.url, job])
      ).values()
    );

    console.log(
      "RemoteOK real jobs:",
      uniqueJobs.length
    );

    return uniqueJobs;
  } catch (error) {
    console.error("RemoteOK Agent Error:", error);

    return [];
  }
}