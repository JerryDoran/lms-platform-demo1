'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import qs from 'query-string';

import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function SearchInput() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      },
    });
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className='relative'>
      <SearchIcon className='h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600' />
      <Input
        className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'
        placeholder='Search for a course'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
