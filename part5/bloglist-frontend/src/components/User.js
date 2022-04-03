import {  useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import { Container, makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  blogList: {
    textDecoration: 'none',
    fontSize: 25,
    marginTop: 20,
  },
  blog: {
    padding: 15,
    '&:hover': {
      color: 'violet'
    }
  }
})

const User = () => {

  const {id} = useParams()
  const user  = useSelector(state => state.users.find(user => user.id === id ))
  const classes = useStyles()

  if (!user) {
    return null
  }

  return (
    <Container>
      <h2> { user.name } </h2>
      <h3>added blogs</h3>
      <Grid container spacing={5}>
        {user.blogs.map(blog => (
          <Grid item xs={12}  md ={12} className={classes.blogList} key={blog.id}>
            <Link  className={classes.blogList} to={`/blogs/${blog.id}`}>
              <Paper className={classes.blog} >
                {blog.title}
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default User;