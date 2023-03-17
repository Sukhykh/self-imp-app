/* styles */
import '../assets/scss/_Lesson.scss';

/* components */

/* dependencies */
import React from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';

const Lesson = (props) => {
    const item = props.data;
    const lessonRef = useRef(null);

    const [isPaused, setIsPaused] = React.useState(true);
    const [onHover, setOnHover] = React.useState(false);
    const [speed, setSpeed] = React.useState(1);
    const [progressView, setProgressView] = React.useState(0);
    const [isPIP, setIsPIP] = React.useState(false);

    /* for progress */
    React.useEffect(() => {
        let progressValue = localStorage.getItem(`${item.title}`);
        if (progressValue !== null) {
            setProgressView(parseFloat(progressValue))
        }
    }, [item.title])

    const localProgress = (progress) => {
        if (progress.playedSeconds !== 0) {
            localStorage.setItem(`${item.title}`, progress.playedSeconds);
            setProgressView(progress.playedSeconds);
        } else {
            lessonRef.current.seekTo(progressView);
            localStorage.removeItem(`${item.title}`);
        }
    }

    /* for manual speed change */
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                const newRate = speed + 0.25;
                setSpeed(newRate);
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                const newRate = speed - 0.25;
                setSpeed(newRate);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [speed]);

    /* for cover */
    const handleHoverOn = () => {
        setOnHover(true)
    }

    const handleHoverOff = () => {
        setOnHover(false)
    }

    const handleHover = () => {
        setOnHover(!onHover)
    } 

    const handlePlay = () => {
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
    };

    /* for picture-in-picture */
    const handlePIPEnter = () => {
        setIsPIP(true)
    }
    const handlePIPLeave = () => {
        setIsPIP(false)
    }

    /* for accordion */
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
                        <div className="lesson__lesson-wrapper">
                            <div className="lesson__img-wrapper" onMouseEnter={handleHoverOn} onMouseLeave={!isPIP && handleHoverOff} onClick={handleHover}>
                                <img className="lesson__img" src={props.poster} alt="lesson.img" />
                                {(onHover || !isPaused ) && <div className="lesson__video-wrapper">
                                    <ReactPlayer className="lesson__video"
                                        ref={lessonRef}
                                        url={item.link}
                                        playing={false}
                                        playbackRate={speed}
                                        onProgress={localProgress}
                                        playedSeconds={progressView}
                                        volume={1}
                                        controls={true}
                                        width='auto'
                                        height='100%'
                                        onPlay={handlePlay}
                                        onPause={handlePause}
                                        onEnablePIP={handlePIPEnter}
                                        onDisablePIP={handlePIPLeave}
                                        confilefig={{
                                            file: {
                                                attributes: {
                                                    crossorigin: "anonymous",
                                                    start: progressView,
                                                },
                                                forceHLS: true,
                                                forceAudio: true,
                                                hlsOptions: {
                                                    native: true,
                                                },
                                            },
                                            onError: (err) => console.log(err),
                                        }} />
                                    {!item.link && <div className="lesson__video-error">Video unavailable</div>}
                                </div>}
                            </div> 
                            <div className="lesson__controls">
                                You can control the video playback speed with the
                                <span className="lesson__controls lesson__controls--colored">'ArrowUp'</span>
                                and
                                <span className="lesson__controls lesson__controls--colored">'ArrowDown'</span>
                                keys.
                            </div>
                            <div className="lesson__controls">
                                Current video playback speed is
                                <span className="lesson__controls lesson__controls--colored">{speed}</span>
                            </div>
                        </div>
                                      
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Lesson