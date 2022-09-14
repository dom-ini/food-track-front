import { useState } from "react";

import DiaryDatePickerContainer from "../components/DiaryDatePickerContainer";
import DiaryEntriesContainer from "../components/DiaryEntriesContainer";
import ProductEntryAddModal from "../components/ProductEntryAddModal";
import GoalsBarContainer from "../components/GoalsBarContainer";

import { DiaryProvider } from "../contexts/DiaryProvider";

const Diary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <DiaryProvider>
      <DiaryDatePickerContainer />
      <DiaryEntriesContainer setIsModalVisible={setIsModalVisible} />
      <GoalsBarContainer />
      <ProductEntryAddModal
        isModalVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
    </DiaryProvider>
  );
};

export default Diary;
