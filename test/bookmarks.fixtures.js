function makeBookmarksArray() {
    return [
        {
            id: 1,
            title: 'Google',
            url: 'http://www.google.com',
            rating: '3',
            description: 'Internet-related services and products.'
        },
        {
            id: 2,
            title: 'Thinkful',
            url: 'http://www.thinkful.com',
            rating: '5',
            description: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
        },
        {
            id: 3,
            title: 'Github',
            url: 'http://www.github.com',
            rating: '4',
            description: 'brings together the world\'s largest community of developers.'
        }
    ]
}

module.exports = { makeBookmarksArray, }