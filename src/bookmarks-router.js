const express = require('express')
const { v4: uuid } = require('uuid')
const BookmarksService = require('./bookmarks-service')
const logger = require('./logger')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BookmarksService.getAllBookmarks(knexInstance)
            .then(bookmarks => {
                res.json(bookmarks)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
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

        const bookmark = {
            title,
            url,
            desc,
            rating
        }

        const knexInstance = req.app.get('db')
        BookmarksService.insertBookmark(knexInstance, bookmark)
            .then(bookmark => {
                logger.info(`Bookmark with id ${bookmark.id} created`);
                res.status(201).location(`http://localhost:8000/bookmarks/${bookmark.id}`).json(bookmark);
            })
            .catch(next)
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res, next) => {
        const { id } = req.params;
        const knexInstance = req.app.get('db')
        BookmarksService.getById(knexInstance, id)
            .then(bookmark => {
                if (!bookmark) {
                    logger.error(`Bookmark with id ${id} not found`);
                    return res.status(404).json({ error: { message: "Bookmark doesn't exist" } });
                }
                res.json(bookmark)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const { id } = req.params;
        const knexInstance = req.app.get('db')
        BookmarksService.deleteBookmark(knexInstance, id)
            .then(() => {
                logger.info(`Bookmark with id ${id} deleted.`);
                res.status(204).end();
            })
            .catch(next)

        // if (bookmarksIndex === -1) {
        //     logger.error(`Bookmark with id ${id} not found.`);
        //     return res.status(404).send('Not found');
        // }
    })

module.exports = bookmarksRouter