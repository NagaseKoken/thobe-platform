import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

interface HeaderSectionProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  titleSuffix?: ReactNode;
}

export default function HeaderSection({
  title,
  actionText = "Action",
  onActionClick,
  titleSuffix,
}: HeaderSectionProps) {
  return (
    <header className="flex justify-between items-center mb-6">
      {}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          {title} <span className="text-base">▼</span>
        </h1>
        {titleSuffix}
      </div>

      {}
      <div className="flex items-center gap-2">
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onActionClick}
        >
          {actionText}
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}