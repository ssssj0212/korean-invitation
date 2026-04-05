type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
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
    ? "mx-auto max-w-[26ch] font-serif text-[1.55rem] leading-[1.08] tracking-[-0.03em] text-text sm:max-w-[30ch] sm:text-[2rem] md:max-w-[22ch] md:text-[2.15rem] lg:max-w-[28ch] lg:text-[2.45rem] xl:max-w-none xl:whitespace-nowrap"
    : "max-w-[24ch] font-serif text-[1.55rem] leading-[1.08] tracking-[-0.03em] text-text sm:max-w-[30ch] sm:text-[1.95rem] md:max-w-none md:text-[2.2rem] md:whitespace-nowrap lg:text-[2.4rem]";
  const descriptionClassName = isCenter
    ? "balanced-copy mx-auto mt-4 max-w-[42rem] text-[13px] leading-7 text-muted sm:text-[14.5px] sm:leading-8"
    : "balanced-copy mt-4 max-w-2xl text-[13px] leading-7 text-muted sm:text-[14.5px] sm:leading-8 md:max-w-4xl";

  return (
    <div className={isCenter ? "mx-auto w-full max-w-[72rem] text-center" : "max-w-5xl text-left"}>
      {eyebrow ? (
        <p className={`ornament mb-4 inline-flex luxury-kicker text-accent ${isCenter ? "mx-auto" : ""}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={titleClassName}>{title}</h2>
      {description ? <p className={descriptionClassName}>{description}</p> : null}
    </div>
  );
}
