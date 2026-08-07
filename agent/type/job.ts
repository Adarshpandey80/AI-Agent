export interface Job {
  company: string;
  title: string;
  location: string;
  platform: string;
  url: string;

  description?: string;
  salary?: string;

  matchScore?: number;
  reason?: string;

  status?: "Pending" | "Applied" | "Interview" | "Rejected" | "Saved";

  applied?: boolean;
  appliedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}