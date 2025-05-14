import { Button } from '@atoms/elements/button';
import { AddIcon } from '@atoms/icons/add-icon';
import { HomeIcon } from '@atoms/icons/home-icon';
import { MediaIcon } from '@atoms/icons/media-icon';
import { ProfileIcon } from '@atoms/icons/profile-icon';
import { useState } from 'react';
import { Link } from 'react-router';
import { useLocation } from 'react-router';

import { SelectTemplate } from '../molecules/select-template';
import { Modal } from './modal';

export function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <footer className="fixed left-0 z-50 h-13 w-full bg-white text-[#232323]/40 shadow-2xl">
      <nav className="max-w-mobile mx-auto flex h-full w-full items-center justify-center">
        <ul className="flex w-full items-center justify-around">
          <li
            className={`text-responsive flex w-1/5 items-center justify-center ${location.pathname === '/' ? 'text-[#232323]' : 'hover:text-[#232323]'}`}
          >
            <Link to="/">
              <HomeIcon className="text-xl" />
            </Link>
          </li>
          <li
            className={`text-responsive flex w-1/5 items-center justify-center text-[1.2rem] ${location.pathname === '/feed' ? 'text-[#232323]' : 'hover:text-[#232323]'}`}
          >
            <Link to="/feed">
              <MediaIcon className="text-xl" />
            </Link>
          </li>
          <li className="text-responsive flex w-1/5 items-center justify-center text-[1.2rem]">
            <Button onClick={() => setIsOpen(true)}>
              <AddIcon className="text-xl" />
            </Button>
          </li>
          <li
            className={`text-responsive flex w-1/5 items-center justify-center ${['/profile', '/profile/bookmark'].includes(location.pathname) ? 'text-[#232323]' : 'hover:text-[#232323]'}`}
          >
            <Link to="/profile">
              <ProfileIcon className="text-xl" />
            </Link>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <SelectTemplate />
        </Modal>
      )}
    </footer>
  );
}
