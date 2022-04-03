import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import {Container, Typography, makeStyles } from '@material-ui/core'
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

const Blogs = () => {

  const { blogs } = useSelector(state => state)
  const classes = useStyles()

  return (
    <Container>
      < Typography
        variant='h5'
        component='h2'
        color='primary'
        align='center'
        gutterBottom
      >
        blogs
      </ Typography>
      <Grid container spacing={5}>
        {
          blogs.map((blog) => (
            <Grid item xs={12}  md ={6} className={classes.blogList} key={blog.id} >
              <Link
                className={classes.blogList}
                to={`/blogs/${blog.id}`}
              >
                <Paper className={classes.blog} >
                  {blog.title} by {blog.author}
                </Paper>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Blogs;