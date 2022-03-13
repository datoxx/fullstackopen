import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer';
import { Link } from "react-router-dom";

const Navigation = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state)

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser())
  }

  return (
    <div>
      <Link to='/'>blogs</Link> <br />
      <Link to='/users'>users</Link> <br />
      <Link to='/create'>create</Link> <br />
      {user
        ? <><em>{user.name} logged-in</em> <button onClick={logOut}>logout</button></>
        : <Link to='/login'>login</Link>}
    </div>
  );
}

export default Navigation;