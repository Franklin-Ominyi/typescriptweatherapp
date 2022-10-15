import React, { useContext } from "react";
import "../loader/Loader.css";
import swal from "sweetalert";
import { AppContext } from "../context/AppContext";

const ErrorComponent = () => {
	const errorData = useContext(AppContext)?.error;

	swal({
		title: "Oops!",
		text: `${errorData.message}. Please try again`,
		icon: "error",
		dangerMode: true,
		closeOnClickOutside: false,
	}).then((reload) => {
		if (reload) {
			window.location.href = "https://weatherhunt.netlify.app";
		}
	});
	return <div className="loader"></div>;
};

export default ErrorComponent;
