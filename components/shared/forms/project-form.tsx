'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import formSchema, { FormSchema } from '@/schemas/project-schema';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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
import Cover from '@/components/shared/forms/cover';

export default function ProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | File>(
    'https://avatar.vercel.sh/webarchitech'
  );
  const [emoji, setEmoji] = useState(
    'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f30e.png'
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormSchema) {
    try {
      console.log(values);
      setIsLoading(true);
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
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
            coverUrl={coverUrl}
            emoji={emoji}
            setCoverUrl={setCoverUrl}
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
