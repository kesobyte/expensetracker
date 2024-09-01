import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { selectFilter, selectStartDate } from '../../redux/filter/selectors';
import { setFilter, setStartDate } from '../../redux/filter/filterSlice';

import svg from '../../images/icons.svg';

export const TransactionSearchTool = () => {
  const filter = useSelector(selectFilter);
  const startDate = useSelector(selectStartDate);
  const dispatch = useDispatch();

  const [tempFilter, setTempFilter] = useState(filter);

  const onFilterChange = e => {
    setTempFilter(e.target.value);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dispatch(setStartDate({ year, month, day }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setFilter(tempFilter));
  };

  return (
    <div className="flex flex-col gap-2 mx-5 mb-5 md:flex-row md:gap-5 md:ml-8 md:mb-4 lg:ml-10">
      <form onSubmit={handleSubmit} className="relative">
        <label className="w-full inline-flex items-center">
          <input
            className="w-full px-6 py-4 rounded-full border border-transparent bg-gray-900 text-gray-400 text-base outline-none transition-colors duration-250 ease-in-out focus:border-green-400 hover:border-green-400"
            placeholder="Search for anything.."
            type="text"
            value={tempFilter}
            onChange={onFilterChange}
          />
          <button type="submit" className="absolute top-4 right-6">
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
          value={startDate}
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
      </div>
    </div>
  );
};
