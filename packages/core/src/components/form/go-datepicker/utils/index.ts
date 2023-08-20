import { DuetLocalizedText } from '../duet-date-picker';

/**
 * get default date adapter for go-datepicker
 * @param dayjs dayjs instance with customParseFormat plugin enabled
 * @param dateFormat format string
 * @returns date adapter option
 */
export const getDefaultDateAdapter = (dayjs, dateFormat: string) => ({
  parse: (value: string): Date => {
    if (!value) {
      return;
    }
    const dayObj = dayjs(value, dateFormat);
    if (dayObj.isValid()) {
      return dayObj.toDate();
    }
  },
  format: (date: Date): string => {
    return dayjs(date).format(dateFormat);
  },
});

export const getDefaultLocalization = (placeholder = '') =>
  ({
    placeholder,
    buttonLabel: 'Choose date',
    selectedDateMessage: 'Selected date is',
    prevMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
    monthSelectLabel: 'Month',
    yearSelectLabel: 'Year',
    closeLabel: 'Close window',
    calendarHeading: 'Choose a date',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    locale: 'en-AU',
  } as DuetLocalizedText);
