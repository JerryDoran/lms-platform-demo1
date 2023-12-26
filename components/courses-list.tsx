import { Category, Course } from '@prisma/client';
import { CoreCell } from '@tanstack/react-table';

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
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
