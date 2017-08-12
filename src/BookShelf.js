import React from 'react'
import PropTypes from 'prop-types'

/**
 * @description Bookshelf stateless component
 * @param { string } bookShelfTitle - title of the bookshelf
 * @param { books } books - list of books on that bookshelf
 * @return returns the bookshelf
*/
const BookShelf = props =>
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
            {props.display(props.books)}
        </div>
    </div>

BookShelf.propTypes = {
    bookShelfTitle: PropTypes.string.isRequired,
    display: PropTypes.func.isRequired,
    books: PropTypes.array
}

export default BookShelf
