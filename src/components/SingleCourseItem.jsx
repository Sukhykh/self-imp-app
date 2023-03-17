/* styles */
import '../assets/scss/_SingleCourseItem.scss';

/* components */

/* dependencies */
import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { useWidthValue } from '../hooks/useWidthValue';

const SingleCourseItem = (props) => {
    const [onHover, setOnHover] = React.useState(false);

    const handleHover = () => {
        setOnHover(!onHover)
    } 

    const item = props.data;
    const index = props.index % 2;
    const poster = item.previewImageLink + '/cover.webp'

    const setLocalStorage = () => {
        localStorage.removeItem('id');
        localStorage.setItem('id', `${item.id}`)
    }

    return (
        <div className='course'>
            <div className={index === 0 ?
                "course__wrapper course__wrapper--border-right" :
                "course__wrapper course__wrapper--border-left"}>
               
                {index === 0 && <div className="course__img-wrapper" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleHover}>
                    <img className="course__img" src={poster} alt="course.img" />
                    {onHover && <div className="course__video-wrapper">
                        {item.meta.courseVideoPreview &&
                            <ReactPlayer className="course__video"
                                         url={item.meta.courseVideoPreview.link}
                                         playing={onHover}
                                         volume={0}
                                         muted={true}
                                         controls={true}
                                         width='auto'
                                         height='100%'
                                         confilefig={{
                                             file: {
                                                 attributes: {
                                                     crossorigin: "anonymous",
                                                 },
                                                 forceHLS: true,
                                                 forceAudio: true,
                                                hlsOptions: {
                                                    native: true,
                                                },
                                             },
                                             onError: (err) => console.log(err),
                                        }}/>
                            }
                        {!item.meta.courseVideoPreview && <div className="course__video-error">video unavailable</div>}
                    </div> } 
                </div>}

                {useWidthValue() > 900 && <div className="course__text-wrapper">
                    <div className="course__title">{item.title}</div>
                    <div className="course__descr-wrapper">
                        <div className="course__skills-bar">
                            <div className="course__string-title">Skills:</div>
                            {item.meta.skills && item.meta.skills.map((element, index) =>
                                <div className="course__skills" key={index}>{index + 1}. {element}</div>)}
                            {!item.meta.skills && <div className="course__skills">The list of skills is not defined!</div>}
                        </div>
                        <div className="course__descr">
                            <div className="course__descr-text">
                                <div className="course__string-title">Number of lessons: <span className="course__info">{item.lessonsCount}</span></div>
                                <div className="course__string-title">Locked lessons: <span className="course__info">{item.containsLockedLessons? "Yes" : "No"}</span></div>
                                <div className="course__string-title">Rating: <span className="course__info">{item.rating}/5</span></div>
                            </div>
                            <Link className="course__btn"
                                to={`/${item.meta.slug}`}
                                onClick={setLocalStorage}>Start course</Link>
                        </div>
                    </div>
                </div>}
                
                {index !== 0 && <div className="course__img-wrapper" onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleHover}>
                    <img className="course__img" src={poster} alt="course.img" />
                    {onHover && <div className="course__video-wrapper">
                        {item.meta.courseVideoPreview &&
                            <ReactPlayer className="course__video"
                                url={item.meta.courseVideoPreview.link}
                                playing={onHover}
                                volume={0}
                                muted={true}
                                controls={true}
                                width='auto'
                                height='100%'
                                confilefig={{
                                    file: {
                                        attributes: {
                                            crossorigin: "anonymous",
                                        },
                                        forceHLS: true,
                                        forceAudio: true,
                                        hlsOptions: {
                                            native: true,
                                        },
                                    },
                                    onError: (err) => console.log(err),
                                }} />
                        }
                        {!item.meta.courseVideoPreview && <div className="course__video-error">Video unavailable</div>}
                    </div> }
                </div>}

                {useWidthValue() <= 900 && <div className="course__text-wrapper">
                    <div className="course__title">{item.title}</div>
                    <div className="course__descr-wrapper">
                        <div className="course__skills-bar">
                            <div className="course__string-title">Skills:</div>
                            {item.meta.skills && item.meta.skills.map((element, index) =>
                                <div className="course__skills" key={index}>{index + 1}. {element}</div>)}
                            {!item.meta.skills && <div className="course__skills">The list of skills is not defined!</div>}
                        </div>
                        <div className="course__descr">
                            <div className="course__descr-text">
                                <div className="course__string-title">Number of lessons: <span className="course__info">{item.lessonsCount}</span></div>
                                <div className="course__string-title">Locked lessons: <span className="course__info">{item.containsLockedLessons ? "Yes" : "No"}</span></div>
                                <div className="course__string-title">Rating: <span className="course__info">{item.rating}/5</span></div>
                            </div>
                            <Link className="course__btn"
                                to={`/${item.meta.slug}`}
                                onClick={setLocalStorage}>Start course</Link>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default SingleCourseItem