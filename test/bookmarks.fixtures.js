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

function makeMaliciousBookmark() {
    const maliciousBookmark = {
        id: 911,
        title: 'Naughty naughty very naughty <script>alert("xss");</script>',
        url: 'https://www.hackers.com',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        rating: 1,
    }
    const expectedArticle = {
        ...maliciousArticle,
        title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
        maliciousArticle,
        expectedArticle,
    }
}

module.exports = { makeBookmarksArray, makeMaliciousBookmark, }