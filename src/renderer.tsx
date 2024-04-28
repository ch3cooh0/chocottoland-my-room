import ReactDOM from 'react-dom/client'; // React 18以降の新しいインポートパス

const App = () => <h1>Hello, Electron and React!</h1>;

// アプリケーションをマウントするコンテナ要素を取得します。
const container = document.getElementById('app');

// コンテナ要素が見つかった場合は、Reactアプリケーションをマウントします。
if (container !== null) {
    const root = ReactDOM.createRoot(container); // React 18の新機能を使用してルートを作成
    root.render(<App />);
} else {
    // コンテナ要素が見つからない場合は、エラーメッセージを表示します。
    console.error('ルート要素が見つかりませんでした');
}
