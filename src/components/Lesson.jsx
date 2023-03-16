/* styles */
import '../assets/scss/_Lesson.scss';

/* components */

/* dependencies */
import React from 'react';

const Lesson = (props) => {
    const item = props.data;
    const [onHover, setOnHover] = React.useState(false);


    const handleHover = () => {
        setOnHover(!onHover)
    } 

    const setActive = () => {
        if (item.status === "locked") {
            return
        }
        props.active.setAccordion(props.index)
    }
    
    return (
        <div className="lesson">
            <div className="lesson__wrapper" onClick={setActive}>
                <div className="lesson__title-wrapper">
                    <div className={item.status !== "locked" ? "lesson__title" : "lesson__title lesson__title--locked"}>{item.order}. {item.title}
                        {item.status === "locked" ? <span className="lesson__title">({item.status})</span>: ''}</div>
                    <div className={item.status !== "locked" ? "lesson__title" : "lesson__title lesson__title--locked"}>{props.index === props.active.accordion ? 'X' : "|||"}</div>
                </div>
                <div className="lesson__body-wrapper">

                    
                    {props.index === props.active.accordion &&
                        <div className="lesson__img-wrapper" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleHover}>
                            <img className="lesson__img" src={props.poster} alt="lesson.img" />
                            {onHover && <div className="lesson__video-wrapper">
                                {item.link && <video className="lesson__video" preload="auto" controls>
                                    <source src={item.link} type="application/x-mpegURL" />
                                Sorry, your browser doesn't support embedded videos.
                            </video>}
                                {!item.link && <div className="lesson__video-error">Video unavailable</div>}
                        </div>}
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default Lesson