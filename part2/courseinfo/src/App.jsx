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
            <Part key={i} part={part.name} exercise={part.exercises} />
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
    console.log('course', props)
    return (
        <>
            <Header course={props.course} />
            <Content course={props.course} />
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts:  [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {

                name: 'Using props to pass data',
                exercises: 7
            },
            {

                name: 'State of a component',
                exercises: 14
            },
            {
                name: 'Redux',
                exercises: 11
            }
        ]
    }

    return <Course course={course} />
}

export default App
