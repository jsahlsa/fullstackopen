const Header = (props) => {

    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p>{props.part} {props.exercise}</p>
        </div>
    )
}

const Content = (props) => {

    return (
        <div>
            {props.parts.map(part =>
            <Part part={part.name} exercise={part.exercises} />
            )}
        </div>
    )
}

const Total = (props) => {

    const total = props.parts.reduce((acc, part) => {
        return acc + part.exercises
    }, 0)

    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'

    const parts = [
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
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default App
