export async function adzunaAgent(profile: any) {
  try {
    const roles = profile.roles || [];
    const searchTerm = roles.length > 0 ? roles.join(" ") : "software developer";
    const country = "in";

    const apiUrl = process.env.ADZUNA_API_URL;
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!apiUrl) throw new Error("ADZUNA_API_URL is missing");
    if (!appId) throw new Error("ADZUNA_APP_ID is missing");
    if (!appKey) throw new Error("ADZUNA_APP_KEY is missing");

    const url = new URL(`${apiUrl}/${country}/search/1`);

    url.searchParams.set("app_id", appId);
    url.searchParams.set("app_key", appKey);
    url.searchParams.set("what", searchTerm);
    url.searchParams.set("results_per_page", "20");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Adzuna API failed: ${response.status}`);
    }

    const data = await response.json();

    return (data.results || []).map((job: any) => ({
      company: job.company?.display_name || "Unknown",
      title: job.title || "Unknown",
      location: job.location?.display_name || "Unknown",
      platform: "Adzuna",
      url: job.redirect_url || "",
      salary:
        job.salary_min || job.salary_max
          ? `${job.salary_min || ""} - ${job.salary_max || ""}`
          : "",
      description: job.description || "",
      score: undefined,
      reason: "",
    }));
  } catch (error) {
    console.error("Adzuna Agent Error:", error);
    return [];
  }
}