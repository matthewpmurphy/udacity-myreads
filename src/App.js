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
    shelves: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    }
  }

  /*
  *  Notificatino object
  */
  _notifcationSystem: null;

  /**
   * @description Display a successful notification message
   * @param { string } message
   */
  successNotfication = (message) => {
    this._notificationSystem.addNotification({
      message: message,
      title: 'Success!',
      level: 'success',
      position: 'tc',
      dismissable: true
    });
  }

  /**
   * @description Display an unsuccessful notification message
   * @param { string } message
   */
  errorNotification = (message) => {
    this._notificationSystem.addNotification({
      message: message,
      title: 'Success!',
      level: 'error',
      position: 'tc',
      dismissable: true
    });
  }

  /**
   * @description Displays the successNofication or errorNotification
   * @param { bool } success
   * @param { string } message
   */
  notificationStatus = (success, message) => {
    success ? this.successNotfication(message) : this.errorNotification(message)
  }

  /**
   * @description Retrieve all books from api and update the state of books with the results
   */
  getBooks = () => {
    BooksAPI.getAll()
      .then( books => {
        this.setState({
          books: books
        });
      });
  }

  /**
   * @description Update the shelf of a single book then display a success or failure message
   * @param { string } id
   * @param { string } shelf
   */
  updateBookStatus = (id, shelf) => {
    var book = { id: id };
    BooksAPI.update(book, shelf)
      .then( response => {
        this.getBooks();
        var message = '';
        if(shelf === 'none') {
          message = 'The book has been removed from your shelves.'
        }
        else {
          message = 'The book has been moved to the ' + this.state.shelves[shelf] + ' shelf.';
        }

        this.notificationStatus(true, message);
      })
      .catch( error => {
        this.notificationStatus(false, JSON.stringify(error));
      });
  }

  /**
   * @description Take an array of books, maps them into an ordered list of book components and returns the list
   * @param { Array } books - Array of books
   * @return an ordered list of book components
   */
  listBooks = (books) => {
    if(books instanceof Array) {
      return (
        <ol className="books-grid">
          {books.map( book => {
            return (
              <li key={book.id}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={this.listAuthors(book.authors)}
                  coverImageUrl={book.imageLinks.thumbnail}
                  shelf={book.shelf}
                  availableShelves={this.state.shelves}
                  update={this.updateBookStatus}
                />
              </li>
            )
          })
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
            listBooks={this.listBooks}
            books={this.state.books.filter(books => books.shelf === key)}
            updateBookStatus={this.updateBookStatus}
          />
        )
      }));
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
   * @description When the website loads, setup notifications and get the list of books in your shelves to display
   *
   */
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.getBooks();
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
          <SearchBooks update={this.updateBookStatus} listBooks={this.listBooks} />
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
