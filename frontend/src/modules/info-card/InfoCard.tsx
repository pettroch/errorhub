import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type InfoCardData = {
  title: string;
  items: {
    name: string;
    value: string;
  }[]
}

export function InfoCard({ data, className = "" }: { data: InfoCardData, className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {data.items.map((item) =>
          <div className="flex items-center justify-between space-x-4" key={item.name}>
            <p className="text-sm text-muted-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.value}</p>

          </div>
        )}
      </CardContent>
    </Card>
  )
}