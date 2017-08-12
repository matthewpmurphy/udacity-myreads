MyReads: A Book Tracking App
===

React application to display and search for books
API and data storage provided by Udacity

### Application Information
The main page contains 3 shelves, Currently Reading, Want to Read, and Read.  The user may interact with each book by clicking the corresponding down arrow.  The user may then change which shelf the book resides on, or select none to remove it altogether.

![Main Page](/screenshots/main-screenshot.png)

If the user clicks the plus sign in the bottom right corner of the screen, they will navigate to the search page.  As the user types, the book listings will be updated.  Users may interact with the books by clicking the corresponding down arrow.  Books already on their shelves will be reflected in the drop down.  Books added to the shelves, will now appear on the main page.

Note: Search terms are limited to those listed in [SEARCH_TERMS.md](SEARCH_TERMS.md). A maximum of 20 results will be returned for each search.

![Search Page](/screenshots/search-screenshot.png)

### Setup
- download the project folder (master branch)
- open your terminal and navigate to project folder
- make sure you have Node.js and npm installed, or get them [here](https://nodejs.org/it/download)
- run `npm install` to install all required dependencies
- run `npm start`

A browser window with the working app should open