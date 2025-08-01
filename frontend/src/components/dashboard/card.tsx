import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  description,
  icon,
  className,
}: DashboardCardProps) {
  return (
    <Card
      className={`group hover:scale-[1.02] transition-all duration-300 animate-slideUp bg-[rgb(var(--primary-white))] shadow-lg hover:shadow-xl ${className}`}
    >
      <CardHeader className="relative overflow-hidden pb-8">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[rgb(var(--primary-blue))] opacity-10 rounded-full -translate-y-12 translate-x-12 group-hover:bg-[rgb(var(--primary-orange-brown))] transition-colors" />
        <div className="flex flex-row items-center gap-4">
          {icon && (
            <div className="p-3 rounded-xl bg-[rgb(var(--primary-blue))] text-[rgb(var(--primary-white))] group-hover:bg-[rgb(var(--primary-orange-brown))] transition-colors">
              {icon}
            </div>
          )}
          <div>
            <CardTitle
              className="text-[20px] font-bold"
              style={{
                fontFamily: "Arial",
                color: "rgb(var(--primary-blue))",
              }}
            >
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription
          className="text-[14px] leading-relaxed"
          style={{
            fontFamily: "Arial",
            color: "rgb(0, 0, 0, 0.7)",
          }}
        >
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
