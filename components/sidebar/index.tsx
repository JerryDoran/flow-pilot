import Logo from '@/components/shared/logo';
import Projects from '@/components/sidebar/projects';
import SidebarLinks from '@/components/sidebar/sidebar-links';

export default function Sidebar() {
  return (
    <>
      <div className='hidden md:inline fixed left-0 top-0 bottom-0 md:w-[250px] bg-secondary'>
        <div className='flex flex-col justify-between h-full p-8 py-10'>
          <div className='flex flex-col justify-between gap-4 w-full'>
            <Logo small />
            <Projects />
            <SidebarLinks />
          </div>
        </div>
      </div>

      {/* Small screens */}
      <div></div>
    </>
  );
}
