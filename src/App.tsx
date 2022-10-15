import React, { Suspense, useContext } from "react";
import "./App.css";
import { AppContext } from "./components/context/AppContext";
import ErrorComponent from "./components/error";
import Loader from "./components/loader";
const Header = React.lazy(() => import("./components/header/index"));
const Description = React.lazy(() => import("./components/description"));
const Widget = React.lazy(() => import("./components/widget"));
const Widget2 = React.lazy(() => import("./components/widget2"));
const Footer = React.lazy(() => import("./components/footer"));

const App: React.FC = () => {
	const appContext = useContext(AppContext);
	const loading = appContext?.loading;
	const error = appContext?.error;

	if (loading && !error) {
		return <Loader />;
	}
	if (error && !loading) {
		return <ErrorComponent />;
	}
	return (
		<div className="app">
			<div className="content">
				<Suspense fallback={<Loader />}>
					<Header />
				</Suspense>
				<div className="description-wrapper">
					<Suspense fallback={<Loader />}>
						<Description />
					</Suspense>
				</div>
				<div className="widget-wrapper">
					<Suspense fallback={<Loader />}>
						<Widget />
					</Suspense>
				</div>
				<div className="widget2-wrapper">
					<Suspense fallback={<Loader />}>
						<Widget2 />
					</Suspense>
				</div>
			</div>
			<div className="widget2-wrapper">
				<Suspense fallback={<Loader />}>
					<Footer />
				</Suspense>
			</div>
		</div>
	);
};

export default App;
