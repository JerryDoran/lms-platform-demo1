import Logo from './logo';
import SidebarRoutes from './sidebar-routes';

export default function Sidebar() {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>
      <div className='flex flex-col w-full pt-1.5'>
        <SidebarRoutes />
      </div>
    </div>
  );
}
