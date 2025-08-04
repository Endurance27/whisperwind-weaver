import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  textColor?: string;
}

export function MetricCard({ title, value, subtitle, bgColor, textColor = "text-white" }: MetricCardProps) {
  return (
    <Card className={cn("border-0 shadow-sm", bgColor, textColor)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs opacity-75 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}