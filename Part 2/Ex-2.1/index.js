import React from "react";
import ReactDOM from "react-dom";


const App = () => {
	const course = {
		name: 'Half Stack Application Development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			}
		]
	}

	
const Course = ({course}) => {
	return (
		<div>
			<h1>{course.name}</h1>
			<p>{course.parts[0].name} {course.parts[0].exercises}</p>
			<p>{course.parts[1].name} {course.parts[1].exercises}</p>
			<p>{course.parts[2].name} {course.parts[2].exercises}</p>
		</div>
	)
}	

	return (
		<div>
			<Course course={course} />
		</div>
	)
}



ReactDOM.render(
  <App />, 
  document.getElementById('root'));
