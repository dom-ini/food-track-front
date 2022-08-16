import { useEffect, useState } from "react";
import { add, sub, eachDayOfInterval, isEqual, format } from "date-fns";
import pl from "date-fns/locale/pl";

import DiaryDatePicker from "./DiaryDatePicker";

import { SMALL_SCREEN_BREAKPOINT } from "../globals/utils";

const VISIBLE_DAYS = window.innerWidth < SMALL_SCREEN_BREAKPOINT ? 5 : 7;
const LOCALE = pl;

const DiaryDatePickerContainer = ({ selectedDay, setSelectedDay }) => {
  const [visibleDays, setVisibleDays] = useState([]);

  const updateVisibleDays = (initialDate) => {
    const datesRange = eachDayOfInterval({
      start: initialDate,
      end: add(initialDate, { days: VISIBLE_DAYS - 1 }),
    });
    setVisibleDays(datesRange);
  };

  const changeVisibleDaysRangeBy = (offset) => {
    const initialDate = add(visibleDays[0], { days: offset });
    updateVisibleDays(initialDate);
  };

  const getMiddleVisibleDay = () => {
    const index = Math.floor(VISIBLE_DAYS / 2);
    return visibleDays[index];
  };

  const handleDayPick = (date) => {
    if (!isEqual(date, selectedDay)) setSelectedDay(date);
  };

  useEffect(() => {
    const updateVisibleDaysOnSelectedDayChange = () => {
      const offset = Math.floor(VISIBLE_DAYS / 2);
      const initialDate = sub(selectedDay, { days: offset });
      updateVisibleDays(initialDate);
    };

    updateVisibleDaysOnSelectedDayChange();
  }, [selectedDay]);

  return (
    <DiaryDatePicker
      selectedDay={selectedDay}
      currentDate={
        visibleDays.length
          ? format(getMiddleVisibleDay(), "LLLL y", { locale: LOCALE })
          : null
      }
      visibleDays={visibleDays}
      handleDayPick={handleDayPick}
      leftBtnAction={() => changeVisibleDaysRangeBy(-VISIBLE_DAYS)}
      rightBtnAction={() => changeVisibleDaysRangeBy(VISIBLE_DAYS)}
    />
  );
};

export default DiaryDatePickerContainer;
