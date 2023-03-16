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
    
    // const host = "https://api.wisey.app";
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
    const timestamp = new Date().getTime();

    // const URL = `${host}/${version}/core/preview-courses/${getLocalStorage()}`
    const URL = `/${version}/core/preview-courses/${getLocalStorage()}?_=${timestamp}`
   
    React.useEffect(() => {
        getCourseData(URL, token)
    }, [])

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
            setLessonsData(data.lessons)
            if (data.meta.skills) {
                setSkillsData(data.meta.skills)
            }
            
        } catch (error) {
            console.error(error);
        }
    }
    
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
                                <img className="single-course__img" src={courseData.previewImageLink + '/cover.webp'} alt="course.img" />
                            </div>
                            <div className="single-course__description">
                                <div className="single-course__description-title">description:</div>
                                <div className="single-course__description-text">{courseData.description}</div>
                            </div>
                        </div>
                        <div className="single-course__data">
                           
                            <div className="single-course__info">
                                <div className="course__string-title">Available from: <span className="course__info">
                                    {`${date.toLocaleDateString('en-US', { month: 'long' })}` + " " + `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}` + ', ' + `${date.getFullYear()}`}</span></div>
                                <div className="text">launchDate: {courseData.launchDate}</div>
                                <div className="text">{courseData.containsLockedLessons ? "contains Locked Lessons" : "NO contains Locked Lessons"}</div>

                                <div className="text">rating: {courseData.rating}</div>
                                <div className="text">status: {courseData.status}</div>
                                {skillsData && <div className="text">skills: {skillsData.map((element, index) => <div key={index}>{element}</div>)}</div>}
                            </div>

                            <div className="lessons">lessons: </div>
                            {lessonsData.map((element, index) => <Lesson key={index} data={element} />)}
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
