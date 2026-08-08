import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true,
        });

        dispatch(setUserData(response.data));
      } catch (error) {
        console.error(error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
