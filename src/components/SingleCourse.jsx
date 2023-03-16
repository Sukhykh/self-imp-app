/* styles */
import '../assets/scss/_SingleCourse.scss';

/* components */
import Lesson from "./Lesson"

/* dependencies */
import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useWidthValue } from '../hooks/useWidthValue';


const SingleCourse = () => {
    const [courseData, setCourseData] = React.useState([])
    const [lessonsData, setLessonsData] = React.useState([])
    const [skillsData, setSkillsData] = React.useState([])
    const [accordion, setAccordion] = React.useState(null)
    
    const host = "https://api.wisey.app";
    const version = 'api/v1'

    const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const body =
        'eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0';
    const signature = 'Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM';
    const token = [header, body, signature].join('.');

    const getLocalStorage = () => {
        return localStorage.getItem('id')
    }

    const date = new Date(courseData.launchDate);
    const URL = `${host}/${version}/core/preview-courses/${getLocalStorage()}`
   
    React.useEffect(() => {
        getCourseData(URL, token)
    }, [URL, token])

    const getCourseData = async (urlValue, tokenValue) => {
        try {
            const response = await axios({
                url: urlValue,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${tokenValue}`,
                },
                responseType: 'json'
            });
            const data = await response.data;
            console.log(data);
            setCourseData(data);
            let lessonsArr = data.lessons.sort((a, b) => a.order - b.order)
            setLessonsData([...lessonsArr])
            if (data.meta.skills) {
                setSkillsData(data.meta.skills)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const poster = courseData.previewImageLink + '/cover.webp'
    
    return (
        <section className="single-course">
            <div className="single-course__container">
                <div className="single-course__wrapper">
                    <div className="single-course__title-bar">
                        <div className="single-course__title">{courseData.title}</div>
                        <Link to='/' className="single-course__btn">
                            {useWidthValue() > 450? 'Back to list': 'Back'}
                        </Link >
                    </div>
                    <div className="single-course__content">
                        <div className="single-course__background">
                            <div className="single-course__img-wrapper">
                                <img className="single-course__img" src={poster} alt="course.img" />
                            </div>
                            <div className="single-course__description">
                                <div className="single-course__description-title">description:</div>
                                <div className="single-course__description-text">{courseData.description}</div>
                            </div>
                        </div>
                        <div className="single-course__data">
                            <div className="single-course__info">
                                <div className="single-course__info-bar">
                                    <div className="single-course__info-header">Brief information</div>
                                    <div className="single-course__info-title">
                                        Rating:
                                        <span className="single-course__info-descr">{courseData.rating}/5</span>
                                    </div>
                                    <div className="single-course__info-title">
                                        Available from:
                                        <span className="single-course__info-descr">
                                            {`${date.toLocaleDateString('en-US', { month: 'long' })}` + " " + `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}` + ', ' + `${date.getFullYear()}`}</span>
                                    </div>
                                    <div className="single-course__info-title">
                                        Status:
                                        <span className="single-course__info-descr">{courseData.status}</span>
                                    </div>
                                    <div className="single-course__info-header">Skills:</div>
                                    {skillsData && skillsData.map((element, index) =>
                                        <div className="single-course__info-descr" key={index}>{index + 1}. {element}</div>)}
                                    {skillsData.length === 0 && <div className="single-course__info-descr single-course__info-descr--single">The list of skills is not defined!</div>}
                                </div>
                            </div>
                            <div className="single-course__lessons">
                                <div className="single-course__info-header">Lessons:</div>
                                <div className="single-course__info-descr single-course__info-descr--single">
                                    {courseData.containsLockedLessons ?
                                        "This course contains locked lessons" :
                                        "This course does not contain locked lessons"}</div>
                                <div className="single-course__lessons-bar">
                                    {lessonsData.map((element, index) => <Lesson key={index}
                                                                                 data={element}
                                                                                 index={index}
                                                                                 active={{ accordion, setAccordion }}
                                                                                 poster={poster} />)}
                                </div>
                                

                            </div>
                        </div>
                    </div>
                    <div className="single-course__title-bar single-course__title-bar--bottom">
                        <Link to='/' className="single-course__btn">
                            {useWidthValue() > 450 ? 'Back to list' : 'Back'}
                        </Link >
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleCourse
