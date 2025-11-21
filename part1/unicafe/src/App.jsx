import { use, useState } from 'react'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>

    )}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + bad + neutral
    const goodScore = good * 1
    const badScore = bad * -1
    const avg = (goodScore + badScore) / all
    const positive = ((goodScore / all) * 100).toFixed(3)

    console.log(all, goodScore, badScore, avg, positive)
    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {avg}</p>
            <p>positive {positive}%</p>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <>
            <h1>give feedback</h1>
            <Button onClick={handleGood} text='good' />
            <Button onClick={handleNeutral} text='neutral' />
            <Button onClick={handleBad} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} />
            {/*<h1>Statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {good + neutral + bad}</p>
            <p>average {((good * 1) + (bad * -1)) / (good + neutral + bad)}</p>
            <p>positive {(good / (good + neutral + bad)) * 100}%</p>*/}
        </>
    )
}

export default App
