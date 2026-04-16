import type { Metadata } from "next";
import SolarPriceIndiaContent from "@/app/solar-price-india/SolarPriceIndiaContent";

export const metadata: Metadata = {
  title: "Solar Panel Price in India | Rooftop Solar Cost by kW",
  description:
    "Explore rooftop solar price in India, installation cost per kW, and practical ranges for 1kW to 10kW systems for homes and businesses.",
  keywords: [
    "solar panel cost in India",
    "rooftop solar price India",
    "1kW solar panel price India",
    "2kW solar system price India",
    "3kW solar panel cost India",
    "5kW solar system price India",
    "10kW solar system price India",
    "solar installation cost per kW India",
  ],
  alternates: {
    canonical: "/solar-price-india",
  },
};

export default function SolarPriceIndiaPage() {
  return <SolarPriceIndiaContent />;
}
