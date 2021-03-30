import moment from 'moment';

/**
 * Converts decimals to percentage string (to 2 decimal places)
 * @param value percentage in decimals
 */
export const percentageFormatter = (value: number) => `${(value * 100).toFixed(2)}%`;

/**
 * Converts epoch time in milliseconds to HH:MM:SS AM/PM
 * @param value time in epoch time
 */
export const epochTimeFormatter = (value: number) => moment(value).format('h:mm:ss:SS A');

/**
 * Converts iso string date time value to ddd, MMM DD, YYYY HH:MM AM/PM
 * @param value
 */
export const isoDateTimeFormatter = (value: string) => moment(value).format('llll');
