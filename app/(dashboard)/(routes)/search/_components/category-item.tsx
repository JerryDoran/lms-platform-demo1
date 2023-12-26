'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string';

type CategoryItemProps = {
  label: string;
  icon?: IconType;
  value?: string;
};

export default function CategoryItem({
  label,
  icon: Icon,
  value,
}: CategoryItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const isSelected = currentCategoryId === value;

  function handleClick() {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-x-1 text-sm border border-slate-200 rounded-full py-2 px-3 transition hover:border-sky-700',
        isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
      )}
    >
      {Icon && <Icon size={20} />}
      <div className='truncate'>{label}</div>
    </button>
  );
}
