import { Tecnology } from "../../projects/models/tecnology";

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  badge?: string;
  description: string;
  tecnologies: Tecnology[];
}