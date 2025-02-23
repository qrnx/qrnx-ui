import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Button className={className} disabled>
      <Loader2 className="animate-spin" />
    </Button>
  );
}
