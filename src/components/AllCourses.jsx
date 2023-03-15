/* styles */
import '../assets/scss/_AllCourses.scss';

/* components */
import SingleCourseItem from "./SingleCourseItem"

/* dependencies */
import React from 'react';
import { useWidthValue } from '../hooks/useWidthValue';

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
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return await response.json();
    };

    React.useEffect(() => {
        getAllCourses(URL).then((data) => {
            console.log(data);
            let sortedData = data.courses.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate))
            setAllCoursesData([...sortedData])
            console.log(data)
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
        <section className="all-courses">
            <div className="all-courses__container">
                <div className="all-courses__wrapper">
                    <div className="all-courses__pagination">
                        <div className="all-courses__pagination-title">
                            {useWidthValue() > 450 ? `All courses available on ${pageNumbers.length} pages:` : "Pages:"}
                        </div>
                        <div className="all-courses__pagination-wrapper">
                            {pageNumbers.map(element => <div
                                className={element === page ?
                                    "all-courses__pagination-item all-courses__pagination-item--active" :
                                    "all-courses__pagination-item"}
                                key={element}
                                onClick={() => setPage(element)}>{element > 9 ? `${element}` : '0' + `${element}`}</div>)}
                        </div>
                    </div>
                    <div className="all-courses__courses">
                        {dataForShow.map((element, index) => <SingleCourseItem key={element.id} data={element} index={index}/>)}
                    </div>
                    <div className="all-courses__pagination">
                        <div className="all-courses__pagination-title">
                            {useWidthValue() > 450 ? `All courses available on ${pageNumbers.length} pages:` : "Pages:"}
                        </div>
                        <div className="all-courses__pagination-wrapper">
                            {pageNumbers.map(element => <div
                                className={element === page ?
                                    "all-courses__pagination-item all-courses__pagination-item--active" :
                                    "all-courses__pagination-item"}
                                key={element}
                                onClick={() => setPage(element)}>{element > 9 ? `${element}` : '0' + `${element}`}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllCourses;