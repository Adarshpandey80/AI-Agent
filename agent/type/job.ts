export type Job = {
  _id?: string;

  company: string;
  title: string;
  location?: string;
  platform?: string;
  url: string;
  salary?: string;
  description?: string;

  score?: number;
  matchScore?: number;
  reason?: string;

  applied?: boolean;

  status?:
    | "Not Applied"
    | "Started"
    | "Applied"
    | "Interview"
    | "Rejected"
    | "Offer"
    | "Failed";

  createdAt?: string;
  updatedAt?: string;
};