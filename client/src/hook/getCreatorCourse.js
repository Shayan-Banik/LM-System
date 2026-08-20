import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";

const useGetCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  return useEffect(() => {
    const creatorCourses = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/get-creator-courses`,
          {
            withCredentials: true,
          },
        );
        console.log(response.data);
        dispatch(setCreatorCourseData(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    creatorCourses();
  }, [userData, dispatch]);
};

export default useGetCreatorCourse;
