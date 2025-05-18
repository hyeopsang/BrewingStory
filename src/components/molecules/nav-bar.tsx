import { Button } from '@atoms/elements/button';
import { AddIcon } from '@atoms/icons/add-icon';
import { HomeIcon } from '@atoms/icons/home-icon';
import { MediaIcon } from '@atoms/icons/media-icon';
import { ProfileIcon } from '@atoms/icons/profile-icon';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { ModalWrapper } from 'src/template/modal-wrapper';

import { UploadTemplateSelector } from './post/upload-template-selector';

interface UserInfo {
  userId: string;
  nickname: string;
  bio: string;
  updatedAt: Date;
}
interface StateType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  auth: {
    user: UserInfo | null;
  };
}

export function NavBar() {
  const auth = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user;
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <footer className="text-blk/40 fixed left-0 z-50 h-13 w-full bg-white shadow-2xl">
      <nav className="max-w-mobile mx-auto flex h-full w-full items-center justify-center">
        <ul className="flex w-full items-center justify-around">
          <li
            className={`text-responsive flex w-1/5 items-center justify-center ${location.pathname === '/' ? 'text-blk' : 'hover:text-blk'}`}
          >
            <Link to="/">
              <HomeIcon className="text-xl" />
            </Link>
          </li>
          <li
            className={`text-responsive flex w-1/5 items-center justify-center text-[1.2rem] ${location.pathname === '/feed' ? 'text-blk' : 'hover:text-blk'}`}
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
            className={`text-responsive flex w-1/5 items-center justify-center ${
              location.pathname.startsWith('/profile')
                ? 'text-blk'
                : 'hover:text-blk'
            }`}
          >
            <Link to={`/profile/${userInfo?.userId}`}>
              <ProfileIcon className="text-xl" />
            </Link>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <ModalWrapper onClose={() => setIsOpen(false)}>
          <UploadTemplateSelector />
        </ModalWrapper>
      )}
    </footer>
  );
}
