import { useContext } from "react";

import DiaryContext from "../contexts/DiaryProvider";

const useDiary = () => {
  return useContext(DiaryContext);
};

export default useDiary;
