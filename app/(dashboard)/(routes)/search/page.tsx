import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { getCourses } from '@/actions/get-courses';
import { auth } from '@clerk/nextjs';

import Categories from './_components/categories';
import SearchInput from '@/components/search-input';
import CoursesList from '@/components/courses-list';

type SearchPageProps = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6'>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
