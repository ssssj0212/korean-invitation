type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const titleClassName = isCenter
    ? "balanced-title mx-auto max-w-[24ch] font-serif text-[clamp(1.36rem,5.4vw,1.72rem)] leading-[1.2] text-text sm:max-w-[26ch]"
    : "balanced-title max-w-[24ch] font-serif text-[clamp(1.32rem,5.2vw,1.68rem)] leading-[1.2] text-text";
  const descriptionClassName = isCenter
    ? "balanced-copy mx-auto mt-4 max-w-[22rem] text-[clamp(0.9rem,3.4vw,0.98rem)] leading-[1.9] text-muted"
    : "balanced-copy mt-4 max-w-[22rem] text-[clamp(0.9rem,3.4vw,0.98rem)] leading-[1.9] text-muted";

  return (
    <div className={isCenter ? "mx-auto w-full max-w-full text-center" : "max-w-full text-left"}>
      {eyebrow ? (
        <p className={`ornament mb-4 inline-flex luxury-kicker text-accent ${isCenter ? "mx-auto" : ""}`}>
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className={titleClassName}>{title}</h2> : null}
      {description ? <p className={descriptionClassName}>{description}</p> : null}
    </div>
  );
}
