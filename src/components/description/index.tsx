import React, { useContext } from "react";
import Utility from "../../utility";
import { AppContext } from "../context/AppContext";
import "./Description.css";

type Props = {};

const Description: React.FC = (props: Props) => {
	const contextData = useContext(AppContext);
	return (
		<div className="description">
			<h2 className="feels-like">
				{Utility(contextData?.data.main.feels_like)}&#176;
			</h2>
			<p className="desc">{contextData?.data.weather[0].description}</p>
			<p className="high-low">
				{Utility(contextData?.data.main.temp_min)}&#176; /
				{Utility(contextData?.data.main.temp_max)}
				&#176;C
			</p>
		</div>
	);
};

export default Description;
