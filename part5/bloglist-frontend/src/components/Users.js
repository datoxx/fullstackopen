import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { Container, Typography,  makeStyles  } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  usersList: {
    textDecoration: 'none',
    fontSize: 25,
    marginTop: 20,
  },
  user: {
    padding: 15,
    '&:hover': {
      color: 'violet'
    }
  }
})

const Users = () => {

  const { users } = useSelector(state => state)
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
        Users
      </ Typography>
      <Grid container spacing={5}>
        {users.map(user => (
          <Grid item xs={12}  md ={6} className={classes.usersList}  key={user.username} >
            <Link to={`/users/${user.id}`} className={classes.usersList}>
              <Paper className={classes.user}>
                {user.username}: {user.blogs.length}
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Users;