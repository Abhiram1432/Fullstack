import React from "react";
import ReactDOM from "react-dom";

const App = () => {
	const courses = [
		{
			name: 'Half Stack Application Development',
			id: 1,
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
				},
				{
					name: 'Redux',
					exercises: 11,
					id: 4
				}
			]
		}, 
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2
				}
			]
		}
	]


	const One = () => {
		return (
			courses[0].parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>)
		)
	}

	
	const Two = () => {
		return (
			courses[1].parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>)
		)
	}
	
	
	const Content = ({courses}) => {
		
		const a = [];
		const b = [];
		
		const reducer = (s, p) => {
			return (	
				s + p
			)
		}
		
		for (let i = 0; i < courses[0].parts.length; i++) {
			a.push(courses[0].parts[i].exercises)
		}
		
		for (let i = 0; i < courses[1].parts.length; i++) {
			b.push(courses[1].parts[i].exercises)
		}
		
		
		return (
			<div>
				<h2>{courses[0].name}</h2>
				<One />
				<p><h3>Total of {a.reduce(reducer)} exercises </h3></p>
				
				<h2>{courses[1].name}</h2>
				<Two />
				<p><h3>Total of {b.reduce(reducer)} exercises </h3></p>
			</div>
		)
	}
	
	return (
		<div>
			<h1>Web Development Curriculum</h1>
			<Content courses = {courses} />
		</div>
	)
}

ReactDOM.render(
  <App/>, 
  document.getElementById('root'));