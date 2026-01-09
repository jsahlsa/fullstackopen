const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message[0] === 'success' ? 'success' : 'error'}>
            {message[1]}
        </div>
    )
}

export default Notification
