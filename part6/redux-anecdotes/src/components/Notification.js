import { useSelector } from "react-redux"

const Notification = () => {

  const { notification } = useSelector(state => state)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const display = notification ? <div style={style}> {notification }</div> : null

  return display
  
}

export default Notification