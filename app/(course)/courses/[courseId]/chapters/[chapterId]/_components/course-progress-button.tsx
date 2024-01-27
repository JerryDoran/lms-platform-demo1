'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

type CourseProgressButtonProps = {
  courseId: string;
  chapterId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
};

export default function CourseProgressButton({
  courseId,
  chapterId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success('Course progress updated');
      router.refresh();
    } catch (error) {
      toast.error('Oops...Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type='button'
      variant={isCompleted ? 'outline' : 'success'}
      className='w-full md:w-auto'
    >
      {isCompleted ? 'Not Completed' : 'Mark as Complete'}
      <Icon className='h-4 w-4 ml-2' />
    </Button>
  );
}
