import type { Metadata } from "next";
import Link from "next/link";
import AnimatedImage from "@/components/about/AnimatedImage";
import StoryBackToTop from "@/components/about/StoryBackToTop";
import StoryProgress from "@/components/about/StoryProgress";
import AnimatedText from "@/components/about/AnimatedText";
import StoryChapterIndex from "@/components/about/StoryChapterIndex";
import StoryHero from "@/components/about/StoryHero";
import SectionWrapper from "@/components/about/SectionWrapper";
import StorySection from "@/components/about/StorySection";

export const metadata: Metadata = {
  title: "About Us | Mysarah Modern Tech",
  description:
    "Rooted in field execution and growing with technology, Mysarah Modern Tech Private Limited is building a premium multi-sector corporate platform from Assam, India.",
};

export default function AboutPage() {
  const chapterItems = [
    { id: "chapter-1", label: "Field Experience" },
    { id: "chapter-2", label: "Beginning with Solar" },
    { id: "chapter-3", label: "Going Digital" },
    { id: "chapter-4", label: "Multi-Sector Vision" },
    { id: "core-values", label: "Core Values" },
    { id: "future-vision", label: "Future Vision" },
    { id: "story-cta", label: "Partnership CTA" },
  ];

  const valueCards = [
    {
      title: "Trust",
      text: "We deliver with transparency, realistic commitments, and accountable execution at every stage.",
    },
    {
      title: "Reliability",
      text: "Our teams follow repeatable systems so quality remains consistent across projects and timelines.",
    },
    {
      title: "Sustainability",
      text: "From solar adoption to process discipline, we focus on long-term value for communities and clients.",
    },
    {
      title: "Innovation",
      text: "We combine operational learning with digital tools to make each next project smarter than the last.",
    },
  ];

  return (
    <main className="about-story-page">
      <StoryProgress />
      <StoryBackToTop />

      <StoryHero />
      <div className="story-chapter-index-slot">
        <StoryChapterIndex items={chapterItems} />
      </div>

      <div className="story-flow">
        <StorySection
          id="chapter-1"
          className="story-tone-a"
          eyebrow=""
          title="Field experience built our foundation"
          text="Our journey started on ground realities, not slide decks. We built trust by executing real projects, managing site constraints, and delivering measurable outcomes for customers."
          image="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Engineers inspecting a solar installation site"
        />

        <StorySection
          id="chapter-2"
          className="story-tone-b"
          eyebrow=""
          title="We began with residential and commercial solar"
          text="Solar became our first major execution engine. It gave us a proven operating model across project planning, installation quality, customer support, and post-installation tracking."
          image="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Large solar panel setup for commercial operations"
          reverse
          bullets={[
            "Residential rooftop installation programs",
            "Commercial solar deployment and maintenance",
            "Standardized workflow from survey to commissioning",
          ]}
        />

        <StorySection
          id="chapter-3"
          className="story-tone-c"
          eyebrow=""
          title="Then we started going digital"
          text="As project volume increased, we focused on digitizing customer touchpoints and internal workflows. This improved response times, expanded accessibility, and strengthened operational visibility."
          image="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Modern technology and digital systems workspace"
        />

        <SectionWrapper id="chapter-4" className="story-tone-d">
          <div className="story-chapter story-chapter-reverse">
            <AnimatedImage
              src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=1400&q=80"
              alt="Corporate expansion roadmap and infrastructure planning"
              direction="left"
            />

            <AnimatedText className="story-copy">
              <p className="story-eyebrow"></p>
              <h2>Our vision is multi-sector and future-ready</h2>
              <p>
                With solar as our proven base, we are preparing structured expansion into electrical services,
                agriculture-linked initiatives, and smart technology operations.
              </p>
              <div className="story-mini-grid">
                <article>
                  <h3>Electrical</h3>
                  <p>Field reliability and infrastructure-grade execution systems.</p>
                </article>
                <article>
                  <h3>Agriculture</h3>
                  <p>Operational models that strengthen productivity and sustainability.</p>
                </article>
                <article>
                  <h3>Smart Tech</h3>
                  <p>Digital layers for visibility, control, and scalable growth.</p>
                </article>
              </div>
            </AnimatedText>
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper id="core-values" className="story-values-wrap">
        <div className="story-container">
          <AnimatedText className="story-center-head">
            <p className="story-eyebrow">Core Values</p>
            <h2>The principles that shape every decision</h2>
          </AnimatedText>

          <div className="story-values-grid">
            {valueCards.map((value, index) => (
              <AnimatedText key={value.title} delay={index * 0.1}>
                <article className="story-value-card">
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              </AnimatedText>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="future-vision">
        <div className="story-container story-future-vision">
          <AnimatedText className="story-center-head">
            <p className="story-eyebrow">Future Vision</p>
            <h2>Building a trusted multi-sector corporate platform from Assam for the next decade.</h2>
            <p>
              We are focused on disciplined growth, stronger digital execution, and sector expansion that creates
              durable long-term value.
            </p>
          </AnimatedText>
        </div>
      </SectionWrapper>

      <section id="story-cta" className="story-cta-section">
        <div className="story-container story-cta-shell">
          <AnimatedText className="story-cta-copy">
            <p className="story-eyebrow">Partnership</p>
            <h2>Let&apos;s Build the Future Together</h2>
            <p>Connect with our team to start your next project with a company built for reliable execution.</p>
          </AnimatedText>
          <div className="story-cta-row">
            <Link href="/contact" className="story-cta-button">
              Contact Us
            </Link>
            <Link href="/sectors/solar" className="story-cta-button story-cta-outline">
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
