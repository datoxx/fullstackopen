import { useField } from "../hook";
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { useNavigate } from "react-router-dom"

import { Container, Typography, Button, makeStyles  } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles({
  filed: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'

  }
})

const BlogForm = () => {

  const classes = useStyles()

  const user = useSelector((state) => state.user)

  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const dispatch =  useDispatch()
  const navigate = useNavigate()

  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: title.inputField.value,
      author: author.inputField.value,
      url: url.inputField.value
    }


    if(!user) {
      return  dispatch(sendNotification(`you need  to login for create blog`))
    }

    dispatch(createBlog(newBlog))
    dispatch(sendNotification(`new blog ${newBlog.title} by ${newBlog.author} added!`))
    title.setValue("")
    author.setValue("")
    url.setValue("")
    navigate('/')
  }


  return (
    <Container>
      < Typography
        variant='h5'
        component='h2'
        color='primary'
        align='center'
        gutterBottom
      >
        Create Blog
      </ Typography>
      <form onSubmit={addBlog}>
        <TextField
          className={classes.filed}
          {...title.inputField}
          label='title'
          color="secondary"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className={classes.filed}
          {...author.inputField}
          label='author'
          color="secondary"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className={classes.filed}
          {...url.inputField}
          label='url'
          color="secondary"
          variant="outlined"
          fullWidth
          required
        />
        <Button
          type="submit"
          color='secondary'
          variant="contained"
        >
           create
        </Button>
      </form>
    </Container>
  );
}

export default BlogForm;