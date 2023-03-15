

const Lesson = (props) => {
    const item = props.data
    
    return (
        <div className="lesson">
            <div className="lesson__container">
                <div className="lesson__wrapper">
                    <div className="text">{item.title}</div>
                </div>
            </div>
        </div>
    )
}

export default Lesson