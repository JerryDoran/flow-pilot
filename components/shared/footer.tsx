export default function Footer() {
  return (
    <footer className='w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-8 fixed bottom-0 dark:bg-gray-900'>
      <span>
        © {new Date().getFullYear()} This site was created by{' '}
        <a
          href='https://thewebarchitech.com'
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:text-blue-500'
        >
          The Web Architech
        </a>
        .
      </span>
    </footer>
  );
}
