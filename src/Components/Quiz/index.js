import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './quiz.css';

//components
import Questions from "../Questions";
import Loader from '../Loader';

function Quiz() {
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(true);
    const location = useLocation()
    const {queryParam} =  location.state
  
    const shuffleArr = arr =>{
        let newArr = arr.sort(()=>Math.random() - 0.5)
        return newArr
    }
  
  const[index, setIndex] = useState(0);
   //fetching questions
   const fetchData = async() =>{
    const endpoint = `https://the-trivia-api.com/api/questions${queryParam.categorySelected}${queryParam.rangeValueSelected}${queryParam.difficultySelected}`
    const response = await fetch(endpoint)
    if(!response.ok){
      throw new Error("Something went wrong")
    }
    return response.json()
  }
  useEffect(()=>{
    fetchData()
    .then((res)=>{
      setData(res)
      setLoading(false)
      
    })
    .catch((e)=>{
      console.log(e.meassage)
    })
  },
  [setData]);
  const totalQuestions = data.length
  if(!loading){
    return (
      <div className="App">
        <div className='container'>
          <Questions data={data} shuffleArr = {shuffleArr}  index={index} setIndex={setIndex} totalQuestions={totalQuestions}/>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div className='container'>
        <div className='m-auto'>
          <div className='card'>
            <div className='card-title'>
            <h3 className='bg-danger'>QUIZZY MONEY</h3>
            </div>
            <div className='card-body'>
              <Loader/>
              <div className='card-footer mt-5'>
                Your questions are loading... hope you are connected to the internet
              <Link to="/">
                <button className='btn btn-dark btn-outline-light mb-2'>Go back to menu</button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
