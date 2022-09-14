import { useEffect, useState } from "react";
import { add, sub, eachDayOfInterval, isEqual, format } from "date-fns";

import DiaryDatePicker from "./DiaryDatePicker";

import useDiary from "../hooks/useDiary";

import {
  SMALL_SCREEN_BREAKPOINT,
  DATE_LOCALE as LOCALE,
} from "../globals/constants";

const VISIBLE_DAYS = window.innerWidth < SMALL_SCREEN_BREAKPOINT ? 5 : 7;

const DiaryDatePickerContainer = () => {
  const [visibleDays, setVisibleDays] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { selectedDay, setSelectedDay } = useDiary();

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
    if (isEqual(date, selectedDay)) {
      setIsCalendarVisible(true);
    } else {
      setSelectedDay(date);
    }
  };

  const handleCalendarDayPick = (date) => {
    setIsCalendarVisible(false);
    setSelectedDay(date);
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
      isCalendarVisible={isCalendarVisible}
      setIsCalendarVisible={setIsCalendarVisible}
      handleCalendarDayPick={handleCalendarDayPick}
    />
  );
};

export default DiaryDatePickerContainer;
