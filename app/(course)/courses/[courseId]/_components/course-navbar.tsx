import { Chapter, Course, UserProgress } from '@prisma/client';

import NavbarRoutes from '@/components/navbar-routes';
import CourseMobileSidebar from './course-mobile-sidebar';

type CourseNavbarProps = {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
};

export default function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white'>
      <CourseMobileSidebar progressCount={progressCount} course={course} />
      <NavbarRoutes />
    </div>
  );
}
