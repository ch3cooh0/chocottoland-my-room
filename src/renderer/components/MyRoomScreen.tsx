import { Link } from 'react-router-dom';

const MyRoomScreen = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>This is Another Screen</h1>
      <Link to="/">
        <button>Back to Menu</button>
      </Link>
    </div>
  );
};

export default MyRoomScreen;
