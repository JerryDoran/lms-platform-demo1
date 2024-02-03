import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';

type DataCardProps = {
  value: number;
  label: string;
  shouldFormat?: boolean;
};

export default function DataCard({
  value,
  label,
  shouldFormat,
}: DataCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader className='flex items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
}
