import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Users = () => {

  const { users } = useSelector(state => state)


  return (
    <div>
      <h2>Users</h2>
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