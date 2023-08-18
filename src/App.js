import {useState} from 'react';
import axios from 'axios';
import CGLogo from './chatGPT.png';
import AppLogo from './app-logo.png';
import './App.css';

function App() {
  const [sampleText, setSampleText] = useState('');
  const [target, setTarget] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // communicate with API
    // post input value 'prompt' to API end point 
    axios
      .post("http://localhost:5555/chat", { sampleText, target })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    
  };

  return (
    <div className="wrapper">
      <div className='title'>Regex.AI</div>
      <div className='subtitle'>Never do Regex again</div>
      <img src={AppLogo} alt="" className="app-logo" />	
      <form onSubmit={handleSubmit}>
        <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
        <input
          type="text"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          placeholder="Input sample text..."
        />
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="What should the Regex expression find?"
        />
        <button type="submit">Ask</button>
      </form>
      <p className="response-area">
        {response && <div>Use this expresion:</div>}
        {loading ? 'loading...' : response}
      </p>
      <div className="footer">~ © 2023 Derrick Cham. All rights reserved. ~</div>
</div>
  );
}

export default App;