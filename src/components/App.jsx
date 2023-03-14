/* styles */
import '../assets/scss/_App.scss';

/* components */
import Header from "./Header"
import Footer from "./Footer"
import AllCourses from "./AllCourses"
import SingleCourse from "./SingleCourse"

/* dependencies */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';


const App = () => {
	
	return (
		<div>
			<Header />
			Hello
			<Link to='/'>AllCourses</Link >
			<Link to='/course'>SingleCourse</Link>
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
			<Footer />
		</div>
	)
};

export default App;
