import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';
import { setFilter, setStartDate } from '../../redux/filter/filterSlice';
import svg from '../../images/icons.svg';
import { DebounceInput } from 'react-debounce-input';

export const TransactionSearchTool = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [tempFilter, setTempFilter] = useState(filter);
  const [selectedDate, setSelectedDate] = useState(null);

  const onFilterChange = e => {
    const value = e.target.value;
    setTempFilter(value);
    dispatch(setFilter(value)); // Immediately search for entered text
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dispatch(setStartDate({ year, month, day })); // Dispatch action with selected date
    } else {
      dispatch(setStartDate(null)); // Show all records when date is cleared
    }
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    dispatch(setStartDate(null)); // Clear the date filter
  };

  useEffect(() => {
    if (selectedDate === null) {
      setSelectedDate(null); // Set the date to null initially to show all records
    }
  }, [selectedDate]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-[20px] w-full">
      <form onSubmit={e => e.preventDefault()} className="relative">
        <label className="inline-flex items-center">
          <DebounceInput
            className="w-[18rem] md:w-[254px] px-[30px] py-[15px] leading-none rounded-full bg-[--black] text-white font-normal placeholder:text-[#fafafa66] outline-none"
            placeholder="Search for anything.."
            type="text"
            value={tempFilter}
            onChange={onFilterChange} // Handle input change immediately
            debounceTimeout={500}
          />
          <button type="button" className="absolute top-4 right-6">
            <svg width={20} height={20}>
              <use href={`${svg}#search-icon`}></use>
            </svg>
          </button>
        </label>
      </form>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
          className="w-[18rem] md:w-[200px] px-[30px] py-[15px] leading-none rounded-full border border-[#fafafa33] bg-transparent text-white font-normal placeholder:text-[#fafafa66] outline-none transition-colors duration-250 ease-in-out focus:border-[springgreen] hover:border-[springgreen]"
        />
        <svg
          className="absolute top-4 right-6 stroke-current text-green-400"
          width={20}
          height={20}
        >
          <use href={`${svg}#calendar-g-icon`}></use>
        </svg>
        {selectedDate && (
          <button
            type="button"
            onClick={handleClearDate}
            className="absolute top-4 right-14"
          >
            <svg width={20} height={20}>
              <use href={`${svg}#clear-icon`}></use>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
