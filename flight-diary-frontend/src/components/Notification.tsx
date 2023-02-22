const Notification = ({ message }: { message: null | string }) => {
  if (!message) {
    return null;
  }

  const style = {
    color: 'red',
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
