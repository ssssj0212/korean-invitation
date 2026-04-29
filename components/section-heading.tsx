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
    ? "mx-auto max-w-[24ch] font-serif text-[clamp(1.45rem,6vw,2rem)] leading-[1.08] text-text sm:max-w-[26ch]"
    : "max-w-[24ch] font-serif text-[clamp(1.4rem,5.7vw,1.92rem)] leading-[1.08] text-text";
  const descriptionClassName = isCenter
    ? "balanced-copy mx-auto mt-4 max-w-[28rem] text-[clamp(0.82rem,3.2vw,0.96rem)] leading-7 text-muted"
    : "balanced-copy mt-4 max-w-[28rem] text-[clamp(0.82rem,3.2vw,0.96rem)] leading-7 text-muted";

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
