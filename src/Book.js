import React, { Component } from 'react'
import './App.css'
class Book extends Component {

    /**
     * @description Boook component, displays an individual book
     * @return returns the setup for a book based on properties passed into it
     */
    render() {
        var thumbnail = (this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : '/img/no-image-found.jpg';
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${thumbnail})` }}>
                    </div>
                    {this.shelfMover()}
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.listAuthors(this.props.book.authors)}</div>
            </div>
        )
    }

    /**
     * @description return div objects populated with the name of each author passed to it
     * @param { Array } authors - list of authors for a specific book
     * @return Return a div with the name of each author
     */
    listAuthors = (authors) => {
        if(authors instanceof Array) {
            return authors.map( (author, index) => {
                return(
                    <div key={index}>{author}</div>
                )
            })
        }
    }

    /**
     * @description Updates the status of a book based on the book id which is passed to the property and the value selected
     * @param { event } event - passes the event when there is a change to the select
     */
    onChangeHandler = (event) => {
        this.props.update(this.props.book, event.target.value);
    }

    /**
     * @description generates the display/options to change the shelf of a book
     * @return returns select box with shelf options, and onchange updates the shelf of a book
     */
    shelfMover = () => {
        var shelf = (this.props.book.shelf) ? this.props.book.shelf : 'none';
        return (
            <div className="book-shelf-changer">
                <select onChange={this.onChangeHandler} value={shelf}>
                    <option value="none" disabled>Move to...</option>
                    {Object.entries(this.props.availableShelves).map(([key, value]) => {
                        return <option key={key} value={key}>{value}</option>
                    })}
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default Book