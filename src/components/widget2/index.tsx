import React, { useContext } from "react";
import Utility, { cardinalPostion, formatDate, minMax } from "../../utility";
import { AppContext } from "../context/AppContext";
import "./Widget2.css";

const Widget2: React.FC = () => {
	const appContext = useContext(AppContext);
	const dailyData = appContext?.dailyData;
	const timezone_offset = appContext?.dailyData.timezone_offset;

	return (
		<div className="widget2">
			<section className="first">
				<div className="item">
					<p>{Math.round(appContext?.data.wind.speed!)}m/s</p>
					<p>{cardinalPostion(appContext?.data.wind.deg)}</p>
				</div>
				<div className="item">
					<p>{appContext?.data.main.humidity}%</p>
					<p>Humidity</p>
				</div>
				<div className="item">
					<p>{Utility(appContext?.data.main.feels_like)}&#176;C</p>
					<p>Feels Like</p>
				</div>
			</section>
			<section className="second">
				{dailyData?.daily?.map((item, index) => (
					<div className="item-2" key={index}>
						<p>{formatDate(item.dt, timezone_offset)}</p>
						<p>
							<img
								src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
								alt="weather"
							/>
						</p>
						<p dangerouslySetInnerHTML={{ __html: minMax(item.feels_like) }}></p>
					</div>
				))}
			</section>
		</div>
	);
};

export default Widget2;
