import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class SearchBooks extends Component {

    /**
     * @description search results are only need for this component, so setting that state here
     */
    state = {
        searchResults:[ ]
    }

    /**
     * @description as someone types, this will execute the searchBooks function
     * @param { event } event - tracks events to the search text box
     */
    handleChange = (event) => {
        this.searchBooks(event.target.value);
    }

    /**
     * @description passes a search query to BooksAPI and updates the state of searchResults
     * @param { string } query - query string to search on
     */
    searchBooks = (query) => {
        if(query.length > 0) {
        BooksAPI.search(query, 20)
            .then( books => {
                this.setState({ searchResults: books });
            });
        }
        else {
            this.setState({ searchResults: [] });
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
                    {this.props.listBooks(this.state.searchResults)}
                </div>
            </div>
        )
    }
}

export default SearchBooks