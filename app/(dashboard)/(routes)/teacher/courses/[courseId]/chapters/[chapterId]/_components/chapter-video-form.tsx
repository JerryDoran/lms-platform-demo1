'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import MuxPlayer from '@mux/mux-player-react';

import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, VideoIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Chapter, MuxData } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/file-upload';

type ChapterVideoFormProps = {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export default function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success('Course successfull updated');
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Oops...Something went wrong');
    }
  }

  function toggleEdit() {
    setIsEditing((prev) => !prev);
  }

  return (
    <section className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-md flex items-center justify-between'>
        Course video
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <VideoIcon className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ''}
              metadata={{
                title: initialData.title,
                description: initialData.description,
              }}
            />
          </div>
        ))}
      {isEditing && (
        <div className=''>
          <FileUpload
            endpoint='chapterVideo'
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className='text-xs text-muted-foreground'>
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </section>
  );
}
