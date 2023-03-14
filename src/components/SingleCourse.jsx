/* styles */
import '../assets/scss/_SingleCourse.scss';

/* components */

/* dependencies */
import React from 'react';


const SingleCourse = () => {
    const [courseData, setCourseData] = React.useState([])
    
    const host = "https://api.wisey.app";
    const version = 'api/v1'

    const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const body =
        'eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0';
    const signature = 'Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM';
    const token = [header, body, signature].join('.');

    const getCourseData = async (url = '') => {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return await response.json();
    };

    React.useEffect(() => {
        const URL = `${host}/${version}/core/preview-courses/${getLocalStorage()}`
        getCourseData(URL).then((data) => {
            console.log(data);
            setCourseData(data)
        });
    }, [])

    const getLocalStorage = () => {
        return localStorage.getItem('id')
    }

    return (
        <div className="div">
            <div className="div">
                here must be a just a single course
                <div>{
                    courseData.title
                }</div>
            </div>
        </div>
    )
}

export default SingleCourse
