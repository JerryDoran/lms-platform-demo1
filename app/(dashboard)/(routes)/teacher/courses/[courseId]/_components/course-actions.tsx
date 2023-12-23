'use client';

import { useState } from 'react';
import axios from 'axios';
import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useConfettiStore } from '@/hooks/use-confetti-store';

type CourseActionsProps = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export default function CourseActions({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  async function onPublish() {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Course successfully unpublished');
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success('Course successfully published');
        confetti.onOpen();
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
      await axios.delete(`/api/courses/${courseId}`);
      toast.success('Course successfully deleted');
      router.refresh();
      router.push('/teacher/courses');
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
