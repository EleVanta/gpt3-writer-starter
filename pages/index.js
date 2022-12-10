import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Make Fire Meals with a Click!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Generate your recipe using AI, based on Type of Meal, Diet, and Mood</h2>
          </div>
          <div calssName="subtitle">
            <h3>Meal Types:</h3> <p>Breakfast, Lunch, Dinner, Snack, etc. </p>
            <h3>Diet Types:</h3> <p>No diet, Omnivore, Vegan, Vegetarian, Pescaterian, Carnivore, Keto, Raw, etc.</p>
            <h3>Mood Types:</h3> <p> Happy, Sad, Angry, Somber, Surprised, Melancholy, Irritated, etc.</p>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="Example: Breakfast, Vegan, Happy"
          value={userInput}
          onChange={onUserChangedText}
        />;
  <div className="prompt-buttons">
    <a 
      className={isGenerating ? 'generate-button loading' : 'generate button'} 
      onClick={callGenerateEndpoint}
    >
      <div className="generate">
        {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
      </div>
    </a>
  </div>
    </div>

    {apiOutput && (
      <div className="output">
        <div className="output-header-container">
          <div className="output-header">
            <h3>Output</h3>
          </div>
         </div>
         <div className="output-content">
          <p>{apiOutput}</p>
         </div> 
      </div>    
    )}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
  </div>
  );
};

export default Home;
