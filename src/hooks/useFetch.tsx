import axios from "axios";
import React from "react";

const useFetch = async (type = "SEARCH", input = "Lagos") => {
	try {
		let data = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=`
		);
		console.log(data);
		return { data, error: false };
	} catch (error) {
		console.log(error);
		return { error: true, message: error };
	}
};

export default useFetch;
