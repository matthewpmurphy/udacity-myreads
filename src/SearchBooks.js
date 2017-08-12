import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

class SearchBooks extends Component {
    /**
     * @description as someone types, this will execute the searchBooks function
     * @param { event } event - tracks events to the search text box
     */
    handleChange = (event) => {
        this.props.searchBooks(event.target.value);
    }

    /**
     * @description generate the search screen
     * @return returns the code to generate the search screen, and displays searchResults based on the state of searchResults
     */
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.handleChange} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    { (this.props.searchResults instanceof Array) ? this.props.listBooks(this.props.searchResults) : <p className="no-results-found">No Results Found</p>}
                </div>
            </div>
        )
    }
}

export default SearchBooks