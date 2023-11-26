import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

type ParamsProps = {
  params: {
    courseId: string;
  };
};

export async function PATCH(req: Request, { params }: ParamsProps) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log('[COURSE_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
