import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core'

const Users = () => {

  const { users } = useSelector(state => state)


  return (
    <div>
      < Typography
        variant='h5'
        component='h2'
        color='primary'
        align='center'
        gutterBottom
      >
        Users
      </ Typography>

      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map(user => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td > {user.blogs.length} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;