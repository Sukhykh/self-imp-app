/* styles */
import '../assets/scss/_AllCourses.scss';

/* components */
import SingleCourseItem from "./SingleCourseItem"

/* dependencies */
import React from 'react';

const AllCourses = () => {

    const [allCoursesData, setAllCoursesData] = React.useState([])
    const [page, setPage] = React.useState(1)

    /* fetching */
    const host = "https://api.wisey.app";
    const version = 'api/v1'
    const URL = `${host}/${version}/core/preview-courses`

    const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const body =
        'eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0';
    const signature = 'Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM';
    const token = [header, body, signature].join('.');
 
    const getAllCourses = async (url = '') => {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return await response.json();
    };

    React.useEffect(() => {
        getAllCourses(URL).then((data) => {
            console.log(data);
            let sortedData = data.courses.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate))
            setAllCoursesData([...sortedData])
            console.log(data.sta)
        });
    }, [])

    /* pagination */
    const coursesOnPage = 10;
    const lastItemIndex = page * coursesOnPage;
    const firstItemIndex = lastItemIndex - coursesOnPage;
    const dataForShow = allCoursesData.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(allCoursesData.length / coursesOnPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="div">
            <div className="div-test">
                here must be a lot of courses
                {dataForShow.map(element => <SingleCourseItem key={element.id} data={element} />)}             
            </div>
            <div className="pagination">
                {pageNumbers.map(element => <div key={element}
                    onClick={() => setPage(element)}>{element}</div>)}
            </div>
        </div>
    )
}

export default AllCourses;