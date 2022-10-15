import axios from "axios";
import React, {
	createContext,
	useState,
	ReactNode,
	FC,
	useEffect,
} from "react";

type dataType = {
	name: string;
	main: {
		feels_like: number;
		temp_min: number;
		temp_max: number;
		humidity: number;
	};
	weather: [{ description: string; icon: string }];
	wind: { deg: number; speed: number };
	sys: { country: string };
};

type dailyDataType = {
	daily: [
		{
			dt: number;
			feels_like: { morn: number; eve: number; day: number; night: number };
			weather: [{ icon: string }];
		}
	];
	hourly: [
		{
			dt: number;
			feels_like: number;
			weather: [{ icon: string }];
		}
	];
	timezone_offset: number;
};

interface AppContextDefault {
	data: dataType;
	setData: React.Dispatch<React.SetStateAction<dataType>>;
	dailyData: dailyDataType;
	loading: boolean;
	error: any;
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	reFetch: Function;
	locationName: string;
	country: string;
	getLocation: Function;
}

const AppContext = createContext<AppContextDefault | null>(null);

interface Props {
	children: ReactNode;
}

const AppContextProvider: FC<Props> = ({ children }) => {
	const [data, setData] = useState<dataType>({
		name: "",
		weather: [{ description: "", icon: "" }],
		main: { feels_like: 0, temp_max: 0, temp_min: 0, humidity: 0 },
		wind: { deg: 0, speed: 0 },
		sys: { country: "" },
	});
	const [dailyData, setDailyData] = useState<dailyDataType>({
		daily: [
			{
				dt: 0,
				feels_like: { day: 0, night: 0, eve: 0, morn: 0 },
				weather: [{ icon: "" }],
			},
		],
		hourly: [
			{
				dt: 0,
				feels_like: 0,
				weather: [{ icon: "" }],
			},
		],
		timezone_offset: 0,
	});

	const popularCities = [
		"Bangkok",
		"London",
		"Paris",
		"Dubai",
		"Singapore",
		"New York",
		"Kuala Lumpur",
		"Tokyo",
		"Istanbul",
		"Seoul",
		"Abakaliki",
	];

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);
	const [input, setInput] = useState<string>("");
	const [locationName, setLocationName] = useState<string>(
		() => popularCities[Math.floor(Math.random() * popularCities.length)]
	);
	const [country, setCountry] = useState("");
	const [lat, setLat] = useState<number>();
	const [lon, setLon] = useState<number>();
	const apiID: string | undefined = "";

	const fetchData = (url: string) => {
		setError(null);
		setLoading(true);
		try {
			axios
				.get(url)
				.then((response) => {
					setData(response.data);
					axios
						.get(
							`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=alerts,current&units=metric&APPID=${apiID}`
						)
						.then((result) => {
							setLocationName(response.data.name);
							setCountry(response.data?.sys.country);
							setDailyData(result.data);
							setLoading(false);
						})
						.catch((err) => {
							console.log(err.message);
							setLoading(false);
							setError(err);
						});
				})
				.catch((err) => {
					console.log(err);
					console.log(err?.message);
					setLoading(false);
					setError(err);
				});

			// return { data, error: false };
		} catch (err: any) {
			setError(err);
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData(
			`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&APPID=${apiID}`
		);
	}, []);

	const reFetch = () => {
		if (input) {
			fetchData(
				`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=${apiID}`
			);
		} else {
			return;
		}
	};

	function showPosition(position: any) {
		setLat(position.coords.latitude);
		setLon(position.coords.longitude);

		console.log(lat, lon);
		if (lat && lon) {
			fetchData(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiID}`
			);
		}
	}

	const getLocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	return (
		<AppContext.Provider
			value={{
				data,
				setData,
				dailyData,
				loading,
				error,
				setInput,
				input,
				reFetch,
				locationName,
				country,
				getLocation,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
export { AppContext };
