import { Job } from "@/type/job"; 


export async function remoteokAgent(profile: any): Promise<Job[]> {
  return [
    {
      company: "Google",
      title: "Frontend Engineer",
      location: "Remote",
      platform: "RemoteOK",
      url: "",
    },
  ];
}