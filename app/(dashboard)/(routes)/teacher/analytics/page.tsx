import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-analytics';
import DataCard from './_components/data-card';
import Chart from './_components/chart';

export default async function Analytics() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
        <DataCard label='Total Sales' value={totalSales} />
        <DataCard label='Total Revenue' value={totalRevenue} shouldFormat />
      </div>
      <Chart data={data} />
    </div>
  );
}
