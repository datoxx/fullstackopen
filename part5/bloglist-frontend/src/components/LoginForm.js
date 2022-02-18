import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setErrorMessage, username, setUsername,password, setPassword}) => {

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
          const responseAboutUser = await loginService.login({username, password})
    
          window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(responseAboutUser))
          
          blogService.setToken(responseAboutUser.token)
          setUser(responseAboutUser)
          setUsername("")
          setPassword("")
        } catch (exception){
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type="text" 
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              type="password" 
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
            />
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