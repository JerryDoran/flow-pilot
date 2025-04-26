import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ small = false }: { small?: boolean }) {
  const logoSize = small ? 40 : 80;
  return (
    <Link className='flex flex-row items-center w-full' href='/'>
      <Image
        src='/pilot.svg'
        width={logoSize}
        height={logoSize}
        alt='Flow Pilot logo'
      />
      <span className='ml-2 text-2xl font-bold'>Flow Pilot</span>
    </Link>
  );
}
