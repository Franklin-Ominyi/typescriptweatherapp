const Utility = (value: number | undefined = 0) => Math.floor(value);
const formatDate = (data: number, timezone_offset: number = 0) => {
	const timestamp = data;
	const milliseconds = 1000 * timestamp + 3600000 * (timezone_offset / 3600);
	const d = new Date(milliseconds);

	let date = d.getUTCDate();
	let month = d.getUTCMonth();
	let day;

	switch (d.getUTCDay()) {
		case 0:
			day = "SUN";
			break;
		case 1:
			day = "MON";
			break;
		case 2:
			day = "TUE";
			break;
		case 3:
			day = "WED";
			break;
		case 4:
			day = "THU";
			break;
		case 5:
			day = "FRI";
			break;
		case 6:
			day = "SAT";
			break;
		default:
			day = "";
			break;
	}

	return `${month + 1}/${date < 10 ? `0${date}` : date} ${day}`;
};

const formatHour = (data: number, timezone_offset: number = 0) => {
	const timestamp = data;
	const milliseconds = 1000 * timestamp + 3600000 * (timezone_offset / 3600);
	const d = new Date(milliseconds);

	let hour = d.getUTCHours();
	return `${hour < 10 ? `0${hour}` : hour}:00`;
};

const minMax = (data: {
	morn: number;
	eve: number;
	day: number;
	night: number;
}) => {
	const a = [data.morn, data.eve, data.day, data.night];
	let min = Math.min(...a);
	let max = Math.max(...a);
	return `${Math.floor(min)}&#176;/${Math.floor(max)}&#176;C`;
};

const cardinalPostion = (coord: number = 0) => {
	let position = "";
	if (coord >= 348.75) {
		position = "N";
	} else if (coord >= 326.25) {
		position = "NNW";
	} else if (coord >= 303.75) {
		position = "NW";
	} else if (coord >= 281.25) {
		position = "WNW";
	} else if (coord >= 258.75) {
		position = "W";
	} else if (coord >= 236.25) {
		position = "WSW";
	} else if (coord >= 213.75) {
		position = "SW";
	} else if (coord >= 191.25) {
		position = "SSW";
	} else if (coord >= 168.75) {
		position = "S";
	} else if (coord >= 146.25) {
		position = "SSE";
	} else if (coord >= 123.75) {
		position = "SE";
	} else if (coord >= 101.25) {
		position = "ESE";
	} else if (coord >= 78.75) {
		position = "E";
	} else if (coord >= 56.25) {
		position = "ENE";
	} else if (coord >= 33.75) {
		position = "NE";
	} else if (coord >= 11.25) {
		position = "NNE";
	}
	return position;
};

export default Utility;
export { formatDate, minMax, formatHour, cardinalPostion };
