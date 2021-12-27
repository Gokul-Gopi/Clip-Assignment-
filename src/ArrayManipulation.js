const removeBookmark = (allBookmarks, id) => {
    return allBookmarks.filter(e => e._id !== id)
}

const editBookmark = (allBookmarks, id, details) => {
    return allBookmarks.map(e => {
        if (e._id === id) {
            e.url = details.url;
            e.description = details.desc;
            return e
        }
        return e
    })
}

export { removeBookmark, editBookmark }