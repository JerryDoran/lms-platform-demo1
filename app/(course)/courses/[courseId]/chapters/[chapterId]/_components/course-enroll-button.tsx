'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { formatPrice } from '@/lib/format';

import { Button } from '@/components/ui/button';

type CourseEnrollButtonProps = {
  courseId: string;
  price: number;
};

export default function CourseEnrollButton({
  courseId,
  price,
}: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      console.log(response);
      window.location.assign(response.data.url);
      toast.success('Course enrolled successfully');
    } catch (error) {
      toast.error('Oops...Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className='w-full md:w-auto'
      size='sm'
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
}
