import moment from "moment";

export function getDateRelativeToNow(inputDate) {
	// Parse the input date string using Moment.js
	const parsedDate = moment(inputDate);

	// Calculate the relative time difference from now
	const relativeTime = parsedDate.fromNow();

	return relativeTime;
}

export function getDateInCalendar(inputDate) {
	// Parse the input date string using Moment.js
	const parsedDate = moment(inputDate);
	return parsedDate.calendar();
}
