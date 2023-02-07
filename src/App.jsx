import { useEffect, useState } from 'react'
import './App.css'
import Start from './Start';
import Questions from './QuestionPage';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [data, setData] = useState([]);
  const url = 'https://opentdb.com/api.php?amount=50&category=14&difficulty=medium&type=multiple&encode=url3986';
  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      const randomIndx = Math.floor(Math.random()*(data.results.length-5))
      var selectedSlice = data.results.slice(randomIndx,randomIndx+5);
      selectedSlice=  selectedSlice.map((ques)=>{
        ques['options'] = shuffleArray([...ques.incorrect_answers, ques.correct_answer]);
        return ques;
      })
      setData(selectedSlice)
    })
  },[])

  function playGame(){
    setStartGame(true)
  }

  function restartGame(){
    setStartGame(false)
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  return (
      
    <div className="App">
      <div className='blob blob--1'></div>
      <div className='blob blob--2'></div>
     {/* <div className='content'> */}
      { !startGame ?
        <Start playGame={playGame}/>
        :
        <Questions questionSet={data} restartGame={restartGame}/>  
      }
      </div>
    // </div>
  )
}

export default App
