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
export const epochTimeFormatter = (value: number) => moment(value).format('LTS')
