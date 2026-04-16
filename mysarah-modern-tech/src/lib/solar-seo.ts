export const solarCities = [
  "delhi",
  "mumbai",
  "bangalore",
  "chennai",
  "hyderabad",
  "pune",
  "kolkata",
  "ahmedabad",
  "jaipur",
  "lucknow",
  "chandigarh",
  "bhopal",
  "patna",
  "indore",
  "nagpur",
  "surat",
  "coimbatore",
  "kochi",
  "guwahati",
  "bhubaneswar",
] as const;

const cityNameMap: Record<(typeof solarCities)[number], string> = {
  delhi: "Delhi",
  mumbai: "Mumbai",
  bangalore: "Bangalore",
  chennai: "Chennai",
  hyderabad: "Hyderabad",
  pune: "Pune",
  kolkata: "Kolkata",
  ahmedabad: "Ahmedabad",
  jaipur: "Jaipur",
  lucknow: "Lucknow",
  chandigarh: "Chandigarh",
  bhopal: "Bhopal",
  patna: "Patna",
  indore: "Indore",
  nagpur: "Nagpur",
  surat: "Surat",
  coimbatore: "Coimbatore",
  kochi: "Kochi",
  guwahati: "Guwahati",
  bhubaneswar: "Bhubaneswar",
};

export function getCityName(slug: string) {
  const normalized = slug.toLowerCase() as (typeof solarCities)[number];
  return cityNameMap[normalized] ?? null;
}
