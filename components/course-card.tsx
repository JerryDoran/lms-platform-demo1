import Image from 'next/image';
import Link from 'next/link';
import { IconBadge } from '@/components/icon-badge';
import { BookOpen } from 'lucide-react';
import { formatPrice } from '@/lib/format';

type CourseCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

export default function CourseCard({
  id,
  imageUrl,
  title,
  price,
  category,
  progress,
  chaptersLength,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full'>
        <div className='relative w-full aspect-video rounded-md overflow-hidden'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='flex flex-col p-2'>
          <h2 className='text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1'>
            {title}
          </h2>
          <p className='text-xs text-muted-foreground'>{category}</p>
          <div className='flex items-center my-3 gap-x-2 text-sm md:text-xs'>
            <div className='flex items-center gap-x-1 text-slate-500'>
              <IconBadge size='sm' icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? 'chapter' : 'chapters'}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <div>TODO: Progress Component</div>
          ) : (
            <p className='text-md md:text-sm font-medium text-slate-700'>
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
