import {Link} from "react-router-dom";
import { useState} from 'react';
import {categoryArray, difficultyArray} from "../selection";

import './home.css';



function Home() {
    const allCategories = categoryArray[0].url_pram
    const defaultDiffculty = difficultyArray[0]
    const [selectedCat, setSelectedCat] = useState(allCategories)
    const [difficulty, setDifficulty] = useState(defaultDiffculty)
    const [rangeValue, setRangeValue] = useState(20)

    const handleRangeValue = e =>{
        setRangeValue(e.currentTarget.value)
    } 

    const handleDifficultySelection = e =>{
        setDifficulty(e.currentTarget.value)
        
    }
    const handleCatSelection = e =>{
        setSelectedCat(e.currentTarget.value)
        
    }
    
   const queryParam = {
    categorySelected: "?categories=" + selectedCat,
    difficultySelected: "&difficulty=" + difficulty,
    rangeValueSelected: "&limit=" + rangeValue
   }
  return (
    <div className="container">
      <div className='container'>
      <div className="card">
            <h3 className='mb-5 bg-danger  card-title'>QUIZZY MONEY</h3>
            <div className='card-body'>
              <label>Categories:</label>
              <select  value={selectedCat} onChange={handleCatSelection} className='form-select form-select-sm'>
                {categoryArray.map(categories =>{
                  return(
                    <option key={categories.category} value={categories.url_pram}>{categories.category}</option>
                  )
                })}
              </select>
              <br/>
              <label>Difficulty:</label>
              <select  value={difficulty} onChange={handleDifficultySelection} className='form-select form-select-sm'>
                {difficultyArray.map(difficultySelction =>{
                  return(
                    <option key={difficultySelction} value={difficultySelction}>{difficultySelction}</option>
                  )
                })}
              </select>
              <br/>
              <label>Number of Questions: {rangeValue} </label><br/>
              <input onChange={handleRangeValue} type='range' min="1" max="20" className='form-range' id="range"/>
              <br/>
            
            </div>
          </div>
          <br/>
          <Link to={'./quiz'} state={{queryParam}}>
            <button className="btn btn-primary" type="submit">Start quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
