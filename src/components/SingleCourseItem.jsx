/* styles */
import '../assets/scss/_SingleCourseItem.scss';

/* components */

/* dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import { useWidthValue } from '../hooks/useWidthValue';

const SingleCourseItem = (props) => {
    const item = props.data;
    const index = props.index % 2;

    const setLocalStorage = () => {
        localStorage.removeItem('id');
        localStorage.setItem('id', `${item.id}`)
    }

    return (
        <div className='course'>
            <div className={index === 0 ?
                "course__wrapper course__wrapper--border-right" :
                "course__wrapper course__wrapper--border-left"}>
                {item.meta.courseVideoPreview && <video className="course__video" autoPlay preload="auto" loop muted controls width="640" height="360" >
                    <source src={item.meta.courseVideoPreview.link} type="application/x-mpegURL" />
                    Sorry, your browser doesn't support embedded videos.
                </video>}
                {index === 0 && <div className="course__img-wrapper">
                    <img className="course__img" src={item.previewImageLink + '/cover.webp'} alt="course.img" />
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
                
                {index !== 0 && <div className="course__img-wrapper">
                    <img className="course__img" src={item.previewImageLink + '/cover.webp'} alt="course.img" />
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