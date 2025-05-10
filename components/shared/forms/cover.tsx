'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import EmojiPicker, { Theme } from 'emoji-picker-react';

type CoverProps = {
  coverUrl: string | File;
  setCoverUrl: (coverUrl: string | File) => void;
  emoji: string;
  setEmoji: (emoji: string) => void;
};

export default function Cover({
  coverUrl,
  setCoverUrl,
  emoji,
  setEmoji,
}: CoverProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (!e.target?.result) return;
      const imageUrl = e.target.result as string;
      setCoverUrl(imageUrl);
      setCoverUrl(file);
    };
    reader.readAsDataURL(file);
  };

  function handleEmojiClick(data: { imageUrl: string }) {
    setShowEmojiPicker(false);
    setEmoji(data.imageUrl);
    // Handle emoji click here
  }

  return (
    <div className='relative w-full h-44 bg-gray-200 group rounded-sm'>
      <Image
        alt='Cover Image'
        src={
          typeof coverUrl === 'string'
            ? coverUrl
            : URL.createObjectURL(coverUrl)
        }
        fill
        className='object-cover group-hover:brightness-80 transition-all duration-300 ease-in-out rounded'
      />
      <div className='absolute inset-0 flex items-end justify-end p-5'>
        <Button
          size='sm'
          type='button'
          className='bg-white/50 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300 transition duration-200 ease-in-out cursor-pointer'
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </Button>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          className='hidden'
          onChange={handleFileChange}
        />
      </div>
      {showEmojiPicker && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-10'
            onClick={() => setShowEmojiPicker(false)}
          ></div>
          <div
            className='absolute z-20'
            style={{
              top: emojiRef.current
                ? emojiRef.current.offsetTop +
                  emojiRef.current.offsetHeight +
                  42
                : 0,
              left: emojiRef.current ? emojiRef.current.offsetLeft : 0,
            }}
          >
            <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
          </div>
        </>
      )}
      <Image
        src={emoji}
        ref={emojiRef}
        width={60}
        height={60}
        alt='Emoji Icon'
        className='absolute bottom-0 left-0 translate-y-1/2 cursor-pointer'
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
    </div>
  );
}
