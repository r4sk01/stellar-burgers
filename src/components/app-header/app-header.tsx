import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserSelector)?.name;
  return <AppHeaderUI userName={userName} />;
};
