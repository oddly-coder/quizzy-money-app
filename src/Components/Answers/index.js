import Swal from 'sweetalert2';
import { successText, failureText } from '../selection';
import './answers.css';

//components


function Answers({answers, correct, nextQuestion,
  correctSelection, notCorrectSelection, 
  setCorrectSelection, setNotCorrectSelection, data, index, shuffleArr, money, setMoney}) {
    const randomSuccessText = shuffleArr(successText)
    const randomFailureText = shuffleArr(failureText)
    const alertMessage = (displayIcon, randomtext) =>{       
      Swal.fire({
        position: 'top-end',
        icon: displayIcon,
        title: randomtext,
        showConfirmButton: false,
        timer: 1500
      })
    }
  const checkAns = e =>{
    let selected = e.currentTarget.value
    if(selected === correct){
      setCorrectSelection([...correctSelection, {question: data[index].question, answer: selected, id:index}])
      setMoney(money + 100)
      alertMessage("success", randomSuccessText[0] )
    }
    else{
      setNotCorrectSelection([...notCorrectSelection, {question: data[index].question, 
        answer: selected, correctAns: data[index].correctAnswer, id:index}])
        alertMessage("error", randomFailureText[0])
    }
    nextQuestion()
  }
  return (
    <div className="container">
      <button className='answers-container btn btn-success mt-2' id={answers} 
      value = {answers} onClick={checkAns}
      >
        {answers}
      </button>
    </div>
  );
}

export default Answers;
