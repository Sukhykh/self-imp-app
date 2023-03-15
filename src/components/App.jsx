/* styles */
import '../assets/scss/_App.scss';

/* components */
import Header from "./Header"
import Footer from "./Footer"
import AllCourses from "./AllCourses"
import SingleCourse from "./SingleCourse"

/* dependencies */
import React from 'react';
import { Routes, Route } from 'react-router-dom';


const App = () => {
	
	return (
		<>
			<Header />
			<main className="main">
				<div className="main__container">
					<div className="main__wrapper">				
						<Routes>
							<Route
								path='/'
								element={<AllCourses />}
							></Route>
							<Route
								path='/:title'
								element={<SingleCourse />}
							></Route>
						</Routes>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
};

export default App;
