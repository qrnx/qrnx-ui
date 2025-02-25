import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Save, ChevronLeft } from "lucide-react";
import { Input } from "./ui/input";

export const AnswerChanger = () => {
  return (
    <Card className="flex flex-col justify-between h-full p-4">
      <div className="text-xl sm:text-2xl font-semibold">
        Customize your Pages
      </div>
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <ChevronLeft />
            Affirmative option
          </div>
          <div className="flex gap-2">
            <Input type="Affirmative" placeholder="Email" />
            <Button size="icon">
              <Save className="size-5" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <ChevronLeft />
            Negative option
          </div>
          <div className="flex gap-2">
            <Input type="Negative" placeholder="Email" />
            <Button size="icon">
              <Save className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
