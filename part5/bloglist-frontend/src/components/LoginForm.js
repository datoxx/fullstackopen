import { useField } from "../hook";
import { useDispatch } from 'react-redux'

import { sendNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";

import loginService from '../services/login'
import blogService from '../services/blogs'

import { useNavigate } from 'react-router-dom'

import { Typography } from '@material-ui/core'

const LoginForm = () => {

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        < Typography
          variant='h5'
          component='h2'
          color='primary'
          align='center'
          gutterBottom
        >
        Log in to application
        </ Typography>

            username
        <input {...username.inputField} />
      </div>
      <div>
            password
        <input {...password.inputField} />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  return (
    <div>
      {loginForm()}
    </div>
  );
}

export default LoginForm;