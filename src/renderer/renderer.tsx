// renderer.tsx
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MenuScreen from './components/MenuScreen';
import MyRoomScreen from './components/MyRoomScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuScreen />} />
        <Route path="/my-room" element={<MyRoomScreen />} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById('app');
if (container !== null) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error('ルート要素が見つかりませんでした');
}
