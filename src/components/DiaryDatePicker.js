import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  add,
  sub,
  eachDayOfInterval,
  isEqual,
  format,
  isToday,
} from "date-fns";
import pl from "date-fns/locale/pl";

import "../styles/DiaryDatePicker.scss";

const SMALL_SCREEN_BREAKPOINT = 575;
const VISIBLE_DAYS = window.innerWidth > SMALL_SCREEN_BREAKPOINT ? 7 : 5;
const LOCALE = pl;

const DiaryDatePicker = ({ selectedDay, setSelectedDay }) => {
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
    <div className="date-picker-container">
      {visibleDays.length && (
        <>
          <h3 className="current-date">
            {format(getMiddleVisibleDay(), "LLLL y", { locale: LOCALE })}
          </h3>
          <div className="buttons">
            <Button
              variant="primary"
              className="rounded-circle"
              onClick={() => changeVisibleDaysRangeBy(-VISIBLE_DAYS)}
            >
              &#8249;
            </Button>
            {visibleDays.map((date, i) => (
              <Button
                variant={
                  isEqual(date, selectedDay)
                    ? "primary"
                    : isToday(date)
                    ? "outline-primary"
                    : ""
                }
                className="rounded-circle"
                key={i}
                onClick={() => handleDayPick(date)}
              >
                {date.getDate()}
              </Button>
            ))}
            <Button
              variant="primary"
              className="rounded-circle"
              onClick={() => changeVisibleDaysRangeBy(VISIBLE_DAYS)}
            >
              &#8250;
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryDatePicker;
