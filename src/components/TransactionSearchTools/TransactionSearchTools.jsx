import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { selectFilter } from '../../redux/filter/selectors';
import { setFilter, setStartDate } from '../../redux/filter/filterSlice';

import svg from '../../images/icons.svg';

export const TransactionSearchTool = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

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
      dispatch(setStartDate({ year, month, day }));
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
    <div className="flex flex-col gap-2 mx-5 mb-5 md:flex-row md:gap-5 md:ml-8 md:mb-4 lg:ml-10">
      <form onSubmit={e => e.preventDefault()} className="relative">
        <label className="w-full inline-flex items-center">
          <input
            className="w-full px-6 py-4 rounded-full border border-transparent bg-gray-900 text-gray-400 text-base outline-none transition-colors duration-250 ease-in-out focus:border-green-400 hover:border-green-400"
            placeholder="Search for anything.."
            type="text"
            value={tempFilter}
            onChange={onFilterChange} // Handle input change immediately
          />
          <button type="button" className="absolute top-4 right-6">
            <svg
              className="stroke-current text-green-400"
              width={20}
              height={20}
            >
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
          className="px-6 py-4 rounded-full border border-gray-300 bg-transparent text-gray-400 outline-none transition-colors duration-250 ease-in-out focus:border-green-400 hover:border-green-400"
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
            <svg className="stroke-current text-red-400" width={20} height={20}>
              <use href={`${svg}#clear-icon`}></use>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
