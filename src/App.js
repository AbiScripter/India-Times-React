import "./App.css";
const API_KEY = `a6eb36a186969ed8b33a82f908bdb58e`;
const headUrl = `https://gnews.io/api/v4/search?q=`;
const country = "in"; //INDIA
const headlinesUrl = `https://gnews.io/api/v4/top-headlines?country=${country}&max=10&lang=en&token=${API_KEY}`;

function App() {
  return <div className="App">HELLO</div>;
}

export default App;
