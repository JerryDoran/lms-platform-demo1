import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Chapter, Course, UserProgress } from '@prisma/client';
import db from '@/lib/db';
import CourseSidebarItem from './course-sidebar-item';

type CourseSidebarProps = {
  progressCount: number;
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
};

export default async function CourseSidebar({
  progressCount,
  course,
}: CourseSidebarProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: course.id,
      },
    },
  });
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
      <div className='p-7 flex flex-col border-b'>
        <h1 className='font-semibold'>{course.title}</h1>
        {/* check purhase and add progress */}
      </div>
      <div className='flex flex-col w-full'>
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isComplete}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
}
