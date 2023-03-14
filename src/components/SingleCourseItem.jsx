/* styles */
import '../assets/scss/_SingleCourseItem.scss';

/* components */
import { Link } from 'react-router-dom';

/* dependencies */
import React from 'react';

const SingleCourseItem = (props) => {

    const setLocalStorage = () => {
        localStorage.removeItem('id');
        localStorage.setItem('id', `${props.data.id}`)
    }

    const getTitle = () => {
        let wordsForArr = props.data.title;
        return wordsForArr.split(' ').map(element => element.toLowerCase()).join('-')
    }

    return (
        <Link
            to={`/${getTitle()}`}
            onClick={setLocalStorage}>{props.data.title}</Link>
    )
}

export default SingleCourseItem