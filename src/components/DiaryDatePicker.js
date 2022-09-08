import { useRef } from "react";
import { Button } from "react-bootstrap";
import { format, isEqual, isToday } from "date-fns";
import Calendar from "react-calendar";

import useOutsideClick from "../hooks/useOutsideClick";

import "react-calendar/dist/Calendar.css";

import "../styles/components/DiaryDatePicker.scss";

const DiaryDatePicker = ({
  selectedDay,
  currentDate,
  visibleDays,
  handleDayPick,
  leftBtnAction,
  rightBtnAction,
  isCalendarVisible,
  setIsCalendarVisible,
  handleCalendarDayPick,
}) => {
  const calendarRef = useRef(null);
  useOutsideClick(calendarRef, () => setIsCalendarVisible(false));

  return (
    <>
      <div className="date-picker-container">
        {visibleDays.length && (
          <>
            <h3 className="current-date">{currentDate}</h3>
            <div className="buttons">
              <Button
                variant="primary"
                className="rounded-circle"
                onClick={leftBtnAction}
                aria-label="Pokaż wcześniejsze daty"
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
                  aria-label={`Wybierz dzień ${format(date, 'yyyy-MM-dd')}`}
                >
                  {date.getDate()}
                </Button>
              ))}
              <Button
                variant="primary"
                className="rounded-circle"
                onClick={rightBtnAction}
                aria-label="Pokaż późniejsze daty"
              >
                &#8250;
              </Button>
            </div>
          </>
        )}
      </div>
      <Calendar
        minDetail="year"
        onClickDay={handleCalendarDayPick}
        className={isCalendarVisible ? null : "d-none"}
        value={selectedDay}
        inputRef={calendarRef}
      />
    </>
  );
};

export default DiaryDatePicker;
