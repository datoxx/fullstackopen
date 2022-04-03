import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor:'#2196f3'
  },
  pageLink: {
    display: 'flex',
    flexDirection: 'row',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    textDecoration: 'none',
    "&:hover": {
      backgroundColor: '#f50057',
      fontWeight: 500,
      color: '#6d1b7b'
    },
    padding: 15,
    color: 'secondary',
    fontSize: 22
  },
  name: {
    color: '#41257b',
    fontWeight: 500,
    fontSize: 20,
    margin: 15
  },
  btn: {
    backgroundColor: '#007bb2',
    "&:hover": {
      cursor: 'pointer',
      backgroundColor: '#df487f',
      color: '#6d1b7b'
    },
    padding: 8,
    fontSize: 15
  }
})

const Navigation = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const {user} = useSelector(state => state)

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser())
  }

  return (
    <div className={classes.wrap}>
      <div className={classes.pageLink}>
        <Link className={classes.text} to='/'>Blogs</Link>
        <Link className={classes.text} to='/users'>Users</Link>
        <Link className={classes.text} to='/create'>Create</Link>
      </div>
      <div>
        {user
          ? <><em className={classes.name}>{user.name} logged-in</em> <button className={classes.btn} onClick={logOut}>logout</button></>
          : <Link className={classes.text} to='/login'>login</Link>}
      </div>
    </div>
  );
}

export default Navigation;