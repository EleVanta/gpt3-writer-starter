import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ChefmateLogo from '../assets/chefmate-logo.png';

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
        <title>ChefMate</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1><Image src={ChefmateLogo} alt="Chefmate logo" width={100} height={50}/></h1>
          </div>
          <div className="header-subtitle">
            <h2>Get step by step instructions for tasty meals, based on Type of Meal, Diet, and Time to cook!</h2>
          </div>
          <div calssName="subtitle">
            <h3>Meal Types:</h3> <p>Breakfast, Lunch, Dinner, Snack, etc. </p>
            <h3>Diet Types:</h3> <p>No diet, Omnivore, Vegan, Vegetarian, Pescaterian, Carnivore, Keto, Raw, etc.</p>
            <h3>Time:</h3> <p> 15mins, 30mins, 1 Hour, etc. </p>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="Example: Breakfast, Vegan, 30mins"
          value={userInput}
          onChange={onUserChangedText}
        />
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
            <h3>Recipe</h3>
          </div>
         </div>
         <div className="output-content">
          <p>{apiOutput}</p>
         </div> 
      </div>    
    )}
  </div>
  );
};

export default Home;
