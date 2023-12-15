'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.snow.css';

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor({ onChange, value }: EditorProps) {
  // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) to avoid hydration error
  // this is because the component is run on the server and then rendered on the client side again
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  return (
    <div className='bg-white'>
      <ReactQuill theme='snow' value={value} onChange={onChange} />
    </div>
  );
}
