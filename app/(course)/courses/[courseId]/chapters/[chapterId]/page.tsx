import { getChapter } from '@/actions/get-chapter';
import Banner from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { File } from 'lucide-react';
import { redirect } from 'next/navigation';
import VideoPlayer from './_components/video-player';
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import Preview from '@/components/preview';
import CourseProgress from '@/components/course-progress';
import CourseProgressButton from './_components/course-progress-button';

export default async function ChapterPage({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) {
    return redirect('/');
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isComplete;

  return (
    <div>
      {userProgress?.isComplete && (
        <Banner variant='success' label='You already completed this chapter' />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          label='You need to purchase this course to watch this chapter'
        />
      )}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className=''>
          <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
            <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isComplete}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div className=''>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className='p-4'>
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center p-3 w-full bg-sky-200 rounded-md border hover:underline'
                  >
                    <File />
                    <p className='line-clamp-1'>{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
