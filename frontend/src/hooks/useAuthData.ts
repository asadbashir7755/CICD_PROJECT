import axiosInstance from '@/helpers/axios-instance';
import { AuthData } from '@/lib/types';
import userState from '@/utils/user-state';
import { useState, useEffect } from 'react';

const useAuthData = (): AuthData => {
  const user = userState.getUser();

  const [data, setData] = useState<AuthData>({
    _id: user?._id || '',
    role: user?.role || '',
    token: '',
    loading: true,
  });

  // Sync with userState changes
  useEffect(() => {
    const currentUser = userState.getUser();
    setData({
      _id: currentUser?._id || '',
      role: currentUser?.role || '',
      token: '',
      loading: true,
    });
  }, [user?._id]);

  useEffect(() => {
    async function fetchToken() {
      const currentUser = userState.getUser();

      // Only fetch token if user ID exists
      if (!currentUser?._id) {
        setData({
          _id: '',
          role: '',
          token: '',
          loading: false,
        });
        return;
      }

      try {
        const res = await axiosInstance.get(`/api/auth/check/${currentUser._id}`);
        setData({
          _id: currentUser._id,
          role: currentUser.role,
          token: res.data?.data,
          loading: false,
        });
      } catch (error: any) {
        // If authentication fails (401/400), clear the invalid user data
        if (error.response?.status === 401 || error.response?.status === 400) {
          userState.removeUser();
        }

        setData({
          _id: '',
          role: '',
          token: '',
          loading: false,
        });
      }
    }
    fetchToken();
  }, [user?._id]);

  return data;
};

export default useAuthData;
