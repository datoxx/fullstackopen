const Notification = ({message}) => {
    
    return ( 
        <div className="error">
            {message ? null : message}
        </div>
     );
}
 
export default Notification;