import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectRefreshToken,
  selectSid,
} from '../redux/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const refreshToken = useSelector(selectRefreshToken);
  const sid = useSelector(selectSid);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    token,
    refreshToken,
    sid,
  };
};
