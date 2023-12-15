'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.bubble.css';

type PreviewProps = {
  value: string;
};

export default function Preview({ value }: PreviewProps) {
  // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) to avoid hydration error
  // this is because the component is run on the server and then rendered on the client side again
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  return <ReactQuill theme='bubble' value={value} readOnly />;
}
