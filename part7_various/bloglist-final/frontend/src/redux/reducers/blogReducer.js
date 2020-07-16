import blogService from '../../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            return action.data
        case 'CREATE_POST':
            return [...state, action.data]
        case 'UPDATE_LIKE':
            let updatedList = state.map(blog =>
                blog.id === action.data.id
                    ? action.data
                    : blog
            )
            return updatedList
        case 'REMOVE_POST':
            let removedList = state.filter(blog => blog.id !== action.id)
            return removedList
        case 'CREATE_COMMENT':
            let commentUpdate = state.map(blog =>
                blog.id === action.data.id
                    ? action.data
                    : blog
            )
            return commentUpdate
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        console.log(data)
        dispatch({
            type: 'INIT',
            data
        })
    }
}

export const createNewBlog = (newPost) => {
    return async dispatch => {
        const data = await blogService.create(newPost)
        dispatch({
            type: 'CREATE_POST',
            data
        })
    }
}

export const updateLike = (updatedBlog) => {
    console.log(updatedBlog)
    return async dispatch => {
        const data = await blogService.update(updatedBlog)
        console.log(data)
        dispatch({
            type: 'UPDATE_LIKE',
            data
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_POST',
            id: id
        })
    }
}

export const createComment = (id, comment) => {
    return async dispatch => {
        const data = await blogService.newComment(id, comment)
        console.log(data)
        dispatch({
            type: 'CREATE_COMMENT',
            data
        })
    }
}

export default blogReducer