import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@insta-puppeteer/ui/components/card";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  amount: number;
};

export const StatCard = ({ amount, title, icon }: StatCardProps) => {
  const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
      </CardContent>
    </Card>
  );
};
