import React from "react";
import "./Footer.css";

function Index() {
	const year = new Date().getFullYear();
	return (
		<div className="footer">
			<div>
				&copy; {year} All Rights Reserved | Developed by{" "}
				<a href="https://frankofficial.netlify.com" target="_blank">
					Alegu Franklin
				</a>
			</div>
		</div>
	);
}

export default Index;
