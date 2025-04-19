import { JSX, ReactNode } from "react";

interface HeaderSectionProps {
  title: string;
  titleSuffix?: ReactNode;
  status?: ReactNode;
  headingLevel?: keyof JSX.IntrinsicElements;
  leftSlot?: ReactNode; // <- NEW: like the mobile menu button
}

export default function HeaderSection({
  title,
  titleSuffix,
  status,
  headingLevel = "h1",
  leftSlot,
}: HeaderSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
      <div className="flex items-center gap-4 w-full">
        {/* Left icon/button (like hamburger) */}
        {leftSlot && <div className="sm:hidden">{leftSlot}</div>}

        {/* Title and status */}
        <div className="flex items-center gap-4">
          <HeadingTag className="text-3xl font-semibold">{title}</HeadingTag>
          {status}
        </div>
      </div>

      {/* Right-side controls */}
      <div className="mt-4 sm:mt-0">{titleSuffix}</div>
    </header>
  );
}