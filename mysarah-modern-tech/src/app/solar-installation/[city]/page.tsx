import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolarCityContent from "@/app/solar-installation/[city]/SolarCityContent";
import { solarCities, getCityName } from "@/lib/solar-seo";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return solarCities.map((city) => ({ city }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = getCityName(city);

  if (!cityName) {
    return { title: "City Not Found" };
  }

  return {
    title: `Solar Installation ${cityName} | Rooftop Solar Services`,
    description: `Looking for solar installation in ${cityName}? Get rooftop solar assessment, installation planning, and execution support for residential and commercial properties.`,
    keywords: [
      `solar installation ${cityName}`,
      `solar company ${cityName}`,
      `rooftop solar ${cityName}`,
      `solar installer ${cityName}`,
      `solar panel ${cityName}`,
    ],
    alternates: {
      canonical: `/solar-installation/${city.toLowerCase()}`,
    },
  };
}

export default async function SolarCityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityName = getCityName(city);

  if (!cityName) {
    notFound();
  }

  return <SolarCityContent cityName={cityName} />;
}
