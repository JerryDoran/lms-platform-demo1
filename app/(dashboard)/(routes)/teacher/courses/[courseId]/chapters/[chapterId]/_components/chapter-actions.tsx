'use client';

import { useState } from 'react';
import axios from 'axios';
import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type ChapterActionProps = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

export default function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onPublish() {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success('Chapter successfully unpublished');
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success('Chapter successfully published');
      }
      router.refresh();
    } catch (error) {
      toast.error('Oops...Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success('Chapter successfully deleted');
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error('Oops...Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant='outline'
        size='sm'
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size='sm' disabled={isLoading}>
          <TrashIcon className='w-4 h-4' />
        </Button>
      </ConfirmModal>
    </div>
  );
}
