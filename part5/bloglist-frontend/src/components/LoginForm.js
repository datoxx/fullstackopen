import { useField } from "../hook";
import { useDispatch } from 'react-redux'

import { sendNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";

import loginService from '../services/login'
import blogService from '../services/blogs'

import { useNavigate } from 'react-router-dom'

import { Typography, Button, makeStyles, TextField, Grid } from '@material-ui/core'


const useStyles = makeStyles({
  filed: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  form: {
    minWidth: 350
  }
})

const LoginForm = () => {

  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField("password")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const responseAboutUser = await loginService.login({
        username: username.inputField.value,
        password : password.inputField.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(responseAboutUser))

      blogService.setToken(responseAboutUser.token)
      dispatch(setUser(responseAboutUser))
      username.setValue("")
      password.setValue("")
      navigate('/')
    } catch (exception){
      dispatch(sendNotification('Wrong credentials'))
    }
  }


  return (
    <Grid container justify='center' alignItems='center' direction='column'  >
      <form onSubmit={handleLogin}  className={classes.form}>
        < Typography
          variant='h5'
          component='h2'
          color='primary'
          align='center'
          gutterBottom
        >
        Log in to application
        </ Typography>
        <TextField
          className={classes.filed}
          {...username.inputField}
          label='username'
          color="secondary"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className={classes.filed}
          {...password.inputField}
          label='password'
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
           login
        </Button>
      </form>
    </Grid>
  );
}

export default LoginForm;