import { Category, Course } from '@prisma/client';
import { CoreCell } from '@tanstack/react-table';
import CourseCard from './course-card';

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type CoursesListProps = {
  items: CourseWithProgressWithCategory[];
};

export default function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4 2xl:grid-cols-5'>
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl!}
            title={item.title}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-10'>
          No courses found
        </div>
      )}
    </div>
  );
}
