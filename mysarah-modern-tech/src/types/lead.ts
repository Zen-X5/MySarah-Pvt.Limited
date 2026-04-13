export type LeadType = "quote" | "contact" | "order";

export type LeadStatus = "new" | "in-progress" | "closed";

export interface LeadProgressUpdate {
  status?: LeadStatus;
  visitConfirmed?: boolean;
  installationCompleted?: boolean;
}

export interface LeadInput {
  name: string;
  phone: string;
  location: string;
  type: LeadType;
  message: string;
}

export interface LeadRecord extends LeadInput {
  _id: string;
  status: LeadStatus;
  visitConfirmed: boolean;
  installationCompleted: boolean;
  installedAt?: string | null;
  createdAt: string;
}

export interface SolarInsights {
  totals: {
    installed: number;
    visitConfirmed: number;
    pipelineOpen: number;
    completionRate: number;
  };
  locations: Array<{
    name: string;
    count: number;
    latitude: number | null;
    longitude: number | null;
  }>;
  recentInstallations: Array<{
    id: string;
    name: string;
    location: string;
    installedAt: string;
  }>;
}
