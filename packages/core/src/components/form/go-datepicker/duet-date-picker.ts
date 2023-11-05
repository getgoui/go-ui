/**
 * Typescript file taken from duet-datepicker
 */
type MonthsNames = [string, string, string, string, string, string, string, string, string, string, string, string];
type DayNames = [string, string, string, string, string, string, string];

export type DuetLocalizedText = {
  buttonLabel: string;
  placeholder: string;
  selectedDateMessage: string;
  prevMonthLabel: string;
  nextMonthLabel: string;
  monthSelectLabel: string;
  yearSelectLabel: string;
  closeLabel: string;
  calendarHeading: string;
  dayNames: DayNames;
  monthNames: MonthsNames;
  monthNamesShort: MonthsNames;
  locale: string | string[];
};

export enum DaysOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export type DuetDatePickerDirection = 'left' | 'right';

type CreateDate = (year: string, month: string, day: string) => Date;
export type DuetDateParser = (input: string, createDate: CreateDate) => Date | undefined;
export type DuetDateFormatter = (date: Date) => string;
export interface DuetDateAdapter {
  parse: DuetDateParser;
  format: DuetDateFormatter;
}

export type DateDisabledPredicate = (date: Date) => boolean;

export interface DuetDatePickerProps {
  /**
   * Name of the date picker input.
   */
  name: string;

  /**
   * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
   */
  identifier: string;

  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  disabled: boolean;

  /**
   * Defines a specific role attribute for the date picker input.
   */
  role: string;

  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  direction: DuetDatePickerDirection;

  /**
   * Should the input be marked as required?
   */
  required: boolean;

  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  value: string;

  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  min: string;

  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  max: string;

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  firstDayOfWeek: DaysOfWeek;

  /**
   * Button labels, day names, month names, etc, used for localization.
   * Default is English.
   */
  localization: DuetLocalizedText;

  /**
   * Date adapter, for custom parsing/formatting.
   * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
   * and a `format` function which accepts a `Date` and returns a `string`.
   * Default is IS0-8601 parsing and formatting.
   */
  dateAdapter: DuetDateAdapter;

  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  isDateDisabled: DateDisabledPredicate;
}
