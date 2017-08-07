import React, { Component } from 'react'
import './App.css'

class BookShelf extends Component {
    /**
     * @description Bookshelf component
     * @return renders the bookshelf component based on the shelf title and books passed to it
     */
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    {this.props.listBooks(this.props.books)}
                </div>
            </div>
        )
    }
}

export default BookShelf
