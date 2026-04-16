import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorDetailContent from "@/app/sectors/[slug]/SectorDetailContent";
import { getSectorBySlug, sectors } from "@/lib/sectors";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return { title: "Sector Not Found" };
  }

  if (slug === "solar") {
    return {
      title: "Solar Installation Services India | Rooftop, Commercial, EPC",
      description:
        "End-to-end solar installation services for homes and businesses. Get rooftop solar planning, technical feasibility, and execution support.",
      keywords: [
        "solar installation services",
        "rooftop solar installer near me",
        "commercial solar installation India",
        "solar EPC company India",
        "solar power system installation",
      ],
      alternates: {
        canonical: "/sectors/solar",
      },
    };
  }

  return {
    title: `${sector.title} | Mysarah Modern Tech`,
    description: sector.description,
    alternates: {
      canonical: `/sectors/${slug}`,
    },
  };
}

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  return <SectorDetailContent sector={sector} />;
}
