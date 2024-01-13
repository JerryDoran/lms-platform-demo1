'use client';
import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useConfettiStore } from '@/hooks/use-confetti-store';

type VideoPlayerProps = {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
};

export default function VideoPlayer({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className='relative aspect-video'>
      {!isReady && !isLocked && (
        <div className='absolute inset-0 flex items-center justify-center bg-slate-800'>
          <Loader2 className=' h-8 w-8 text-secondary animate-spin' />
        </div>
      )}
      {isLocked && (
        <div className='absolute inset-0 flex flex-col text-secondary gap-y-2 items-center justify-center bg-slate-800'>
          <Lock className='h-8 w-8' />
          <p className='text-sm'>This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
}
