import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './questions.css';

//components
import Answers from "../Answers";

function Questions({data, shuffleArr, index, setIndex, totalQuestions}) {
  const [money, setMoney] = useState(0);
  const [correctSelection, setCorrectSelection] = useState([])
  const [notCorrectSelection, setNotCorrectSelection] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const notCorrect = data[index]?.incorrectAnswers
  const correct = data[index]?.correctAnswer
  const options = notCorrect? [...notCorrect,[correct]] : []
  const randomOptions = shuffleArr(options)
   const nextQuestion = () =>{
    let nextIndex = index + 1
    setIndex(nextIndex)
   }
   const reset = () =>{
    document.location.reload()
   }
   useEffect(()=>{
    if(totalQuestions === index){
      setGameOver(true)
    }
   })
   if(!gameOver){
    return (
      <div className='container'>
          <div className="q-container bg-primary">
            <h3 className='bg-danger'>QUIZZY MONEY</h3>
              <div className='top-container mb-3'>
                <div className="question-tracker text-light bg-warning">
                  QUESTION {index + 1}/{totalQuestions}
                </div>
                <div><h1 style={{display:"inline"}}>&#128181;:${money}</h1></div>
              </div>
              <p>{data[index]?.question}</p>
              <div className='answers'>
                {
                  randomOptions.map(answers=>{
                    return <Answers data = {data} index = {index} answers = {answers} key = {answers} correct={correct} 
                    nextQuestion = {nextQuestion} setCorrectSelection={setCorrectSelection}
                    correctSelection={correctSelection} notCorrectSelection={notCorrectSelection}
                    setNotCorrectSelection={setNotCorrectSelection} shuffleArr={shuffleArr} setMoney={setMoney} money={money}/> 
                  })}
              </div>
              <br/>
              <Link to="/">
                <button className='btn btn-dark btn-outline-light mb-2'>Go back to menu</button>
              </Link>
          </div>
          
      </div>
    );
   }
   else{
    return (
      <div className='container'>
          <div className="q-container bg-primary">
            <h3 className='bg-danger'>QUIZZY MONEY</h3>
              GAME OVER
              <div className='mb-2 text-light'>
                You got: {totalQuestions - notCorrectSelection.length} right out of {totalQuestions}
              </div>
              <div className='mb-2 text-light'>
                You earned: ${money}
              </div>
              <button className='btn btn-outline-light mb-2' onClick={reset}>Restart</button>
              <Link to="/">
                <button className='btn btn-dark btn-outline-light mb-2'>Go back to menu</button>
              </Link>
              <div className='bg-info p-2'>
                <h5 className='text-light'>You got right:</h5>
                {
                  correctSelection.map(correctOnes=>{
                    return(
                      <div className='container' key={correctOnes.id}>
                        <div className='card' >
                          <div className="card-body bg-success">
                            <div className="card-heading bg-warning text-light">Question:</div>
                            <div className='mb-2' >{correctOnes.question}</div>
                            <div className="card-heading bg-info text-light">Answer:</div>
                            <div >{correctOnes.answer}</div>
                          </div>
                        </div>
                        <br/>
                    </div>
                    )
                  })
                }
              </div>
              <div className='bg-danger p-2'>
                <h5 className='text-light'>You got wrong:</h5>
                {
                  notCorrectSelection.map(notCorrectOnes=>{
                    return(
                      <div className='container' key={notCorrectOnes.id}>
                        <div className='card'  >
                          <div className='card-body'>
                            <div className="card-heading bg-warning text-light">Question:</div>
                            <div className='mb-2' >{notCorrectOnes.question}</div>
                            <div className="card-heading bg-danger text-light">Answer selected:</div>
                            <div>{notCorrectOnes.answer}</div>
                            <div className="card-heading bg-info text-light">Right answer:</div>
                            <div >{notCorrectOnes.correctAns}</div>
                          </div>
                        </div>
                        <br/>
                      </div>
                    )
                  })
                }
              </div>
          </div>
          
      </div>
    );
   }
  
  
}

export default Questions;
