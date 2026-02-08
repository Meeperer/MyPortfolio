import { Outlet } from 'react-router-dom';
import { CursorElements, useCursor } from './components/Cursor';
import HardwareAccelModal from './components/HardwareAccelModal';

export default function Layout() {
  useCursor();
  return (
    <>
      <HardwareAccelModal />
      <CursorElements />
      <Outlet />
    </>
  );
}
