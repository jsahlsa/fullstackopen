const Header = (props) => {

    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercise}</p>
        </div>
    )
}

const Content = (props) => {

    return (
        <div>
            {props.course.parts.map((part, i) =>
            <Part key={part.id} part={part.name} exercise={part.exercises} />
            )}
        </div>
    )
}

const Total = (props) => {

    const total = props.course.parts.reduce((acc, part) => {
        return acc + part.exercises
    }, 0)

    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

const Course = (props) => {
    return (
        <>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts:  [
                {
                    id: 1,
                    name: 'Fundamentals of React',
                    exercises: 10
                },
                {
                    id: 2,
                    name: 'Using props to pass data',
                    exercises: 7
                },
                {
                    id: 3,
                    name: 'State of a component',
                    exercises: 14
                },
                {
                    id: 4,
                    name: 'Redux',
                    exercises: 11
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    id: 1,
                    name: 'Routing',
                    exercises: 3
                },
                {
                    id: 2,
                    name: 'Middlewares',
                    exercises: 7
                }
            ]
        }]

    return (
        courses.map(course => <Course key={course.id} course={course} />)
    )
}

export default App
