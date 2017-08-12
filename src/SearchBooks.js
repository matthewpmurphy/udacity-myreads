import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
    /**
     * @description as someone types, this will execute the searchBooks function
     * @param { event } event - tracks events to the search text box
     */
    handleChange = (event) => {
        this.props.searchBooks(event.target.value);
    }

    /**
     * @description checks for searchResults and query passed as props and determines what to display
     * @return display search results when the results and a query both exist, display "No results found" if only the query exists, and nothing otherwise
     */
    displaySearchResults = () => {
        if(Array.isArray(this.props.searchResults) && this.props.query.length > 0) {
            return this.props.display(this.props.searchResults);
        }
        else if(this.props.query.length > 0) {
            return (<p className="no-results-found">No Results Found</p>);
        }
        else {
            return '';
        }
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
                    {this.displaySearchResults()}
                </div>
            </div>
        )
    }
}

SearchBooks.propTypes = {
    searchResults: PropTypes.array,
    searchBooks: PropTypes.func.isRequired,
    display: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
}

export default SearchBooks