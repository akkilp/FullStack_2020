

const dummy = () => {
  return 1
}

const combineLikes = (arr) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return arr.length === 0
    ? 0
    : arr.reduce(reducer, 0)
}

const favoriteBlog = (arr) => {
  const reducer = (top, current) => {
    if(top===0){return current}
    return top = current.likes>top.likes ? current : top
  }
  return arr.length === 0
    ? undefined
    : arr.reduce(reducer, 0)
}


const mostBlogs = (arr) => {

  const reducer = (allBlogs, currentBlog) => {
    if(!allBlogs){
      return allBlogs=currentBlog
    }
    return arr.filter(current => current.author===currentBlog.author).length < arr.filter(current=>current.author===allBlogs.author)
      ? allBlogs
      : currentBlog
  }
  let mostBlogs = arr.reduce(reducer, [])

  let format = {author: mostBlogs.author, blogs: arr.filter(i=>i.author===mostBlogs.author).length}

  return arr.length === 0
    ? undefined
    : format
}

const mostLikes = (arr) => {

  const getPosts = arr => arr.map(post => {
    return post.author
  })
    
  const flattenAuthors = arr => arr.filter((current, index, arr)=>{
    return arr.indexOf(current) === index
  })
    
  const countBlogs = (author) => {
    return arr.reduce((total,curr)=>{
      return curr.author===author ? total+=curr.likes : total
    },0)
  }
    
  const finalArr = (arr) => {
    return arr.map(author =>{
      return {author: author, likes: countBlogs(author)}
    })
  }

  const mostLiked = (arr) => {
    return arr.reduce((a,b)=>{
      return a.likes>b.likes ? a : b
    })
  }
 
  const pipeline = [getPosts, flattenAuthors, finalArr, mostLiked]


  return arr.length>0 
    ? pipeline.reduce((total, func)=>{return func(total)}, arr)
    : undefined
}


module.exports = {
  dummy,
  combineLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}