'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import projectFormSchema, { ProjectFormSchema } from '@/schemas/project-schema';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { uploadCover } from '@/services/cover';
import { createProject } from '@/actions/projects';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Cover from '@/components/forms/cover';

export default function ProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [cover, setCover] = useState<string | File>(
    'https://avatar.vercel.sh/webarchitech'
  );
  const [emoji, setEmoji] = useState(
    'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f30e.png'
  );

  const router = useRouter();

  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      // add other fields here if your schema has more
    },
  });

  const session = useSession();

  async function onSubmit(values: ProjectFormSchema) {
    try {
      setIsLoading(true);
      // get cover url
      const coverUrl = await uploadCover(cover);
      if (!coverUrl) {
        return toast.error('Failed to upload cover image');
      }
      toast.success('Cover image uploaded successfully');

      //check if user is authenticated
      const { user } = session.data || {};
      if (!user) {
        return toast.error('You must be logged in to create a project');
      }

      const projectData = {
        cover: coverUrl,
        emoji,
        name: values.name,
        description: values.description || '',
        ownerId: user.id,
      };

      await createProject(projectData);
      toast.success('Project created successfully!');
      router.push('/dashboard');

      //save project
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('An error occurred uploading cover image.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-3xl mx-auto '
      >
        <h2 className='text-4xl font-bold text-zinc-200'>
          Create a new project
        </h2>
        <div className='py-5 space-y-1'>
          <FormLabel className='text-lg font-semibold'>Cover Image</FormLabel>
          <Cover
            coverUrl={cover}
            emoji={emoji}
            setCoverUrl={setCover}
            setEmoji={setEmoji}
          />
        </div>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='e.g., My Project' type='text' {...field} />
              </FormControl>
              <FormDescription>Give a name to your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='e.g., My project is about...'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Give more details about your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='flex items-center gap-1.5 cursor-pointer'
        >
          <span>Create</span>
          {isLoading ? <Loader2 className='animate-spin' /> : null}
        </Button>
      </form>
    </Form>
  );
}
