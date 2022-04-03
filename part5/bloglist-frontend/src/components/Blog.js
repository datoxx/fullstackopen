import { useField } from '../hook'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from "react-router-dom"

import {Container, Button, Typography, Card, CardHeader, CardContent,  makeStyles, IconButton} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { DeleteOutline } from '@material-ui/icons'

const useStyles = makeStyles({
  link:{
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    textDecoration: 'none',
    color: 'secondary'
  },
  commentTitle: {
    fontSize: 30,
    marginTop: 60,
    marginBottom: 20
  },
  like: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
  commentText: {
    fontSize: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }
})



const Blog = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const comment = useField('text')
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id ))
  const user = useSelector((state) => state.user)


  if(!blog) {
    return null
  }

  const own = user && blog.user && user.username === blog.user.username

  const likeToBlog = () => {
    const newObject = {
      ...blog,
      likes: (blog.likes||0) + 1,
      user: blog.user.id
    }
    dispatch(updateBlog(newObject))
  }


  const removeToBlog =  () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if(!ok) return

    dispatch(removeBlog(blog.id))
    navigate('/')
  }

  const addComment = (e) => {
    e.preventDefault()

    const newObj = {
      ...blog,
      comments: blog.comments.concat(comment.inputField.value),
      user: blog.user.id
    }
    dispatch(updateBlog(newObj))
    comment.setValue('')
  }

  return(
    <Container>
      <Card elevation={3}>
        <CardHeader
          title={blog.title}
          subheader={blog.author}
          action={
            own &&
            <IconButton color='secondary' variant='contained'  onClick={removeToBlog}>
              <DeleteOutline />
            </IconButton>
          }
        />
        <CardContent>
          <a className={classes.link} href={blog.url}>{blog.url}</a>
          <p className={classes.like}> likes: {blog.likes}</p>
          <Button color='primary' variant='contained' onClick={likeToBlog}>like</Button>
        </CardContent>
      </Card>
      < Typography
        className={classes.commentTitle}
        variant='h5'
        component='h4'
        color='primary'
        gutterBottom
      >
        comments
      </ Typography>

      <form onSubmit={addComment} >
        <TextField
          {...comment.inputField}
          color="secondary"
          variant="outlined"
          required
          fullWidth
        />
        <Button type='submit' variant="contained">add comment</Button>
        <Grid container >
          <Grid item xs={12}>
            {blog.comments.map((comment, index) =>
              <Paper key={index} className={classes.commentText}>
                {comment}
              </Paper>)}
          </Grid>
        </Grid>
      </form>

    </Container>
  )

}

export default Blog