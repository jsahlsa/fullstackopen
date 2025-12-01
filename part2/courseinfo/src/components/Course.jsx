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

export default Course
