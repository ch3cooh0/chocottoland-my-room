import { Link } from 'react-router-dom';

const MenuScreen = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>冒険者のお部屋</h1>
      <Link to="/my-room">
        <button>お部屋</button>
      </Link>
      <br></br>
      <button>設定</button>
    </div>
  );
};

export default MenuScreen;
