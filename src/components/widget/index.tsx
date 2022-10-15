import React, { useContext } from "react";
import { formatHour, minMax } from "../../utility";
import { AppContext } from "../context/AppContext";
import "./Widget.css";

type Props = {};

const Widget: React.FC = (props: Props) => {
	const appContext = useContext(AppContext)?.dailyData;
	const hourlyData = appContext?.hourly;

	return (
		<div className="widget">
			{hourlyData?.map((item, index) => (
				<div className="item" key={index}>
					<p>{formatHour(item.dt, appContext?.timezone_offset)}</p>
					<p>
						<img
							src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
							alt=""
						/>
					</p>
					<p>{Math.round(item.feels_like)}&#176;C</p>
				</div>
			))}
		</div>
	);
};

export default Widget;
