import { Job } from "@/type/job"; 

export async function linkedinAgent(profile: any): Promise<Job[]> {
    return [
        {
            company: "Google",
            title: "Frontend Engineer",
            location: "Remote",
            platform: "LinkedIn",
            url: "",
        },
    ];
}