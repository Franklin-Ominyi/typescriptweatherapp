import React from "react";
import "./Loader.css";

const Loader = () => {
	return (
		<div className="loader">
			<p>Loading</p>
			<i className="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i>
		</div>
	);
};

export default Loader;
