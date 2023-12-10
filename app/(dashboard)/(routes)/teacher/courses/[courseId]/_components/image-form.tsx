'use client';

import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/file-upload';

type ImageFormProps = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: 'Image is required' }),
});

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
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
        Course image
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <ImageIcon className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              alt='upload'
              fill
              className='object-cover rounded-md'
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div className=''>
          <FileUpload
            endpoint='courseImage'
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            16:9 apsect ratio recommended
          </div>
        </div>
      )}
    </section>
  );
}
