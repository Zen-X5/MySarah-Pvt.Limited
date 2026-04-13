import AnimatedImage from "@/components/about/AnimatedImage";
import AnimatedText from "@/components/about/AnimatedText";
import SectionWrapper from "@/components/about/SectionWrapper";

interface StorySectionProps {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  bullets?: string[];
  id?: string;
  className?: string;
}

export default function StorySection({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  reverse = false,
  bullets,
  id,
  className = "",
}: StorySectionProps) {
  return (
    <SectionWrapper id={id} className={className}>
      <div className={`story-chapter ${reverse ? "story-chapter-reverse" : ""}`.trim()}>
        <AnimatedText className="story-copy">
          <p className="story-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
          {bullets?.length ? (
            <ul className="story-list">
              {bullets.map((bullet, index) => (
                <AnimatedText key={bullet} as="li" delay={0.08 * (index + 1)}>
                  {bullet}
                </AnimatedText>
              ))}
            </ul>
          ) : null}
        </AnimatedText>

        <AnimatedImage src={image} alt={imageAlt} direction={reverse ? "left" : "right"} />
      </div>
    </SectionWrapper>
  );
}
