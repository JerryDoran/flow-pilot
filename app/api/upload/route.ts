import { utapi } from '@/uploadthing';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const response = await utapi.uploadFiles(file);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
