export type Job = {
  _id?: string;

  company: string;
  title: string;
  location?: string;
  platform?: string;
  url: string;
  salary?: string;

  score?: number;
  matchScore?: number;

  reason?: string;

  applied?: boolean;
  status?: string;

  createdAt?: string;
  updatedAt?: string;
};