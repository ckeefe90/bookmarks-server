const express = require('express')
const { v4: uuid } = require('uuid')
const xss = require('xss')
const BookmarksService = require('./bookmarks-service')
const logger = require('./logger')

const bookmarksRouter = express.Router()
const jsonParser = express.json()
const starRating = ["1", "2", "3", "4", "5"]

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
    .post(jsonParser, (req, res, next) => {
        const { title, url, description, rating } = req.body;
        const newBookmark = {
            title,
            url,
            description,
            rating
        }
        for (const [key, value] of Object.entries(newBookmark)) {
            if (!value) {
                return res.status(400).json({ error: { message: `Missing '${key}' in request body` } })
            }
        }
        if (!starRating.includes(rating)) {
            return res.status(400).json({ error: { message: `Rating must be one of ${starRating.join(", ")}` } })
        }

        const knexInstance = req.app.get('db')
        BookmarksService.insertBookmark(knexInstance, newBookmark)
            .then(bookmark => {
                logger.info(`Bookmark with id ${bookmark.id} created`);
                res.status(201).location(`/bookmarks/${bookmark.id}`).json(bookmark);
            })
            .catch(next)
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .all((req, res, next) => {
        BookmarksService.getById(
            req.app.get('db'),
            req.params.id
        )
            .then(bookmark => {
                if (!bookmark) {
                    return res.status(404).json({ error: { message: "Bookmark doesn't exist" } })
                }
                res.bookmark = bookmark
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.bookmark.id,
            title: xss(res.bookmark.title), // sanitize title
            description: xss(res.bookmark.description), // sanitize content
            rating: xss(res.bookmark.rating),
            url: xss(res.bookmark.url),
        })
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
    })

module.exports = bookmarksRouter