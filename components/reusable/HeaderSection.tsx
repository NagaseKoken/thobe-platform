import { JSX, ReactNode } from "react";

interface HeaderSectionProps {
  title: string;
  titleSuffix?: ReactNode;
  status?: ReactNode;
  headingLevel?: keyof JSX.IntrinsicElements;
}

export default function HeaderSection({
  title,
  titleSuffix,
  status,
  headingLevel = "h1",
}: HeaderSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-200 pb-4">
      <div className="flex items-center gap-4">
        <HeadingTag className="text-3xl font-semibold">
          {title}
        </HeadingTag>
        {status}
      </div>
      <div className="mt-4 sm:mt-0">{titleSuffix}</div>
    </header>
  );
}