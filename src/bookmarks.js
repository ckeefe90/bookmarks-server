const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('./logger')
const { bookmarks } = require('./store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks);
    })
    .post(bodyParser, (req, res) => {
        const { title, url, desc, rating } = req.body;
        if (!title) {
            logger.error(`Title is required.`);
            return res.status(400).send('title is required');
        }
        if (!url) {
            logger.error(`URL is required.`);
            return res.status(400).send('url is required');
        }
        if (!desc) {
            logger.error(`Description is required`);
            return res.status(400).send('description is required');
        }
        if (!rating || isNaN(Number(rating))) {
            logger.error(`Rating is required.`)
            return res.status(400).send('rating is required and must be a number')
        }

        //get an id
        const id = uuid();
        const bookmark = {
            id,
            title,
            url,
            desc,
            rating
        }

        bookmarks.push(bookmark);
        logger.info(`Bookmark with id ${id} created`);
        res.status(201).location(`http://localhost:8000/bookmarks/${id}`).json(bookmark);
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(bookmark => bookmark.id === Number(id))
        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found`);
            return res.status(404).send('Bookmark Not Found');
        }
        res.json(bookmark);
    })
    .delete((req, res) => {
        const { id } = req.params;
        const bookmarksIndex = bookmarks.findIndex(b => b.id == id);

        if (bookmarksIndex === -1) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res.status(404).send('Not found');
        }

        //remove bookmark from lists
        bookmarks.splice(bookmarksIndex, 1);

        logger.info(`Bookmark with id ${id} deleted.`);

        res.status(204).end();
    })

module.exports = bookmarksRouter