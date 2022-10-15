import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./Header.css";

const Header: React.FC = () => {
	const [width, setWidth] = useState(false);
	const appContext = useContext(AppContext);
	const input = appContext?.input;
	const setInput = appContext?.setInput!;
	const locationName = appContext?.locationName;
	const reFetch = appContext?.reFetch!;
	const country = appContext?.country;
	const getLocation = appContext?.getLocation!;

	const handleClick = async () => {
		await getLocation();
	};

	return (
		<div className="header">
			<div className="left-content">
				<p className="town">
					{locationName}
					{country && ", "}
					{country}
				</p>

				<p>
					<i
						className="fa fa-map-marker"
						style={{ color: "var(--primary-white)" }}
						aria-hidden="true"
					></i>
				</p>
			</div>
			<div className="right-content">
				<p id="search-wrapper">
					<input
						type="text"
						placeholder="Search city"
						id="search-input"
						className={width ? "active" : ""}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onFocus={() => setWidth(true)}
						onBlur={() => setWidth(false)}
					/>
					<i
						onClick={() => reFetch()}
						className="fa fa-search"
						id="search"
						aria-hidden="true"
					></i>
				</p>
				<p>
					<i
						className="fa fa-compass"
						onClick={() => handleClick()}
						id="location"
						aria-hidden="true"
					></i>
				</p>
			</div>
		</div>
	);
};

export default Header;
