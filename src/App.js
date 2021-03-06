import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf.js'
import Book from './Book.js'
import SearchBooks from './SearchBooks.js'
import NotificationSystem from 'react-notification-system'
import './App.css'

class BooksApp extends Component {
  //Track state for books in our shelves as well as the books in our serach results
  state = {
    books: [],
    searchResults: [],
    searchQuery: [],
    shelves: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    }
  }

  /*
  *  Notification object
  */
  _notifcationSystem: null;

  /**
   * @description Displays the success or error message based on the bool parameter passed
   * @param { bool } success -  if the message is a success message or not
   * @param { string } message - actual message to display
   * @return displays a notification message
   */
  notificationStatus = (success, message) => {
    let messageLevel = 'error';
    let title =  'Oops!';

    if(success) {
      messageLevel = 'success';
      title = 'Success!';
    }

    this._notificationSystem.addNotification({
      message: message,
      title: title,
      level: messageLevel,
      position: 'tc',
      dismissable: true
    });
  }

  /**
   * @description Retrieve all books from api and update the state of books with the results
   */
  getBooksOnShelves = () => {
    BooksAPI.getAll()
      .then( books => this.setState({ books: books }));
  }

  /**
   * @description Update the shelf of a single book, update the list of books to reflect the change, then display a success or failure message
   * @param { string } id
   * @param { string } shelf
   */
  updateBookStatus = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf)
      .then( response => {
        this.getBooksOnShelves();
        const message = shelf === 'none' ? 'The book has been removed from your shelves.' : `The book has been moved to the ${this.state.shelves[shelf]} shelf`
        this.notificationStatus(true, message);
      })
      .catch( error => {
        this.notificationStatus(false, JSON.stringify(error));
      });
  }

  /**
  * @description passes a search query to BooksAPI and updates the state of searchResults
  * @param { string } query - query string to search on
  */
  searchBooks = (query) => {
    this.setState({
      searchResults: [],
      searchQuery: query
    });

    if(query.length > 0) {
      BooksAPI.search(query, 20)
        .then( books => this.setState({ searchResults: this.checkForShelf(books) }));
    }
  }

  /**
   * @description replace book objects that are already on our shelves so we have the correct shelf
   * @param { Array } books - list of books, presumable returned from the API
   * @return list of books that now includes the correct shelf for those already on our shelves
  */
  checkForShelf = (books) => {
    if(Array.isArray(books)) {
      return books.map((book) => {
        const _book = this.state.books.find( bookOnShelf => bookOnShelf.id === book.id);
        return (!!_book) ? _book : book;
      });
    }
  }

  /**
   * @description Take an array of books, maps them into an ordered list of book components and returns the list
   * @param { Array } books - Array of books
   * @return an ordered list of book components
   */
  listBooks = (books) => {
    if(Array.isArray(books)) {
      return (
        <ol className="books-grid">
          {books.map( book => (
              <li key={book.id}>
                <Book
                  book={book}
                  availableShelves={this.state.shelves}
                  update={this.updateBookStatus}
                />
              </li>
          ))
        }
      </ol>
      )
    }
  }

  /**
   * @description Display all the book shelves in the this.state.shelves object
   * @return returns a bookshelf object for all shelves tracked in this.state.shelves
   */
  displayShelves = () => {
    return (
      Object.entries(this.state.shelves).map(([key, value]) => {
        return (
          <BookShelf
            key={key}
            bookShelfTitle={value}
            display={this.listBooks}
            books={this.state.books.filter(books => books.shelf === key)}
          />
        )
      }));
  }

  /**
   * @description When the website loads, setup notifications and get the list of books in your shelves to display
   *
   */
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.getBooksOnShelves();
  }

  /**
   * @description renders the website
   * @return returns NotificationSystem Component and routes contained in the application
   */
  render() {
    return (
      <div className="app">
        <NotificationSystem ref="notificationSystem" />
        <Route exact path="/search" render={() => (
          <SearchBooks
            update={this.updateBookStatus}
            display={this.listBooks}
            searchResults={this.state.searchResults}
            searchBooks={this.searchBooks}
            query={this.state.searchQuery}
          />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.displayShelves()}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
