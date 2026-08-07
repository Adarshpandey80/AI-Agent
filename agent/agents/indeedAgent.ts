import { Job } from "@/type/job"; 


export async function indeedAgent(profile: any): Promise<Job[]> {
  return [
    {
      company: "Google",
      title: "Frontend Engineer",
      location: "Remote",
      platform: "Indeed",
      url: "",
    },
  ];
}