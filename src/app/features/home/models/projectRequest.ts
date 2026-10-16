export interface ProjectRequest {
  id?: string;
  applicantName: string;
  email: string;
  projectType: string;
  description: string;
  budget: number;
  estimatedDate: string;
  createdAt?: string;
}