import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'


const LoginForm = ({ show, setError, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
          setError(error.graphQLErrors[0].message)
        }
      })

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])


      if (!show) {
        return null
      }

    const submit = async (event) => {
        event.preventDefault()
    
        login({ variables: { username, password } })
    }

    return (  
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username <br />
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        required
                    />
                </div>
                <div>
                    password <br />
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        required
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );
}
 
export default LoginForm;