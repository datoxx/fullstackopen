import { connect } from 'react-redux'

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const display = notification ? <div style={style}> {notification }</div> : null

  return display
  
}

const mapStateToProps = notification => notification

export default connect(mapStateToProps)(Notification)