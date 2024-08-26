import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectToken,
  selectRefreshToken,
  selectSid,
  selectIsLoading,
  // selectIsRefreshing,
} from '../redux/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const refreshToken = useSelector(selectRefreshToken);
  const sid = useSelector(selectSid);
  const isLoading = useSelector(selectIsLoading);
  // const isRefreshing = useSelector(selectIsRefreshing);

  return {
    isLoggedIn,
    user,
    token,
    refreshToken,
    sid,
    isLoading,
    // isRefreshing,
  };
};
