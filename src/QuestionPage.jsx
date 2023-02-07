import { useState } from "react";
import ConfettiComp from './Confetti';

export default function Questions(props){
    const [selectedValues, setSelectedValues] = useState({})
    const [score, setScore] = useState(0);
    const [frozenChoices, setFreezeChoices] = useState(false)
    const [confetti, setConfetti] = useState(false)

    function decodeStr(item){
        return decodeURIComponent(item);
    }
    function handleClick(value, id){
        var chosenVal = decodeStr(value);
        setSelectedValues(prevVal=> {
            if( prevVal[id] === chosenVal ){
                chosenVal='';
            }
            return { ...prevVal, [id]: chosenVal};
        })
    }
    function checkForMatch(marked, correct){
        return marked === correct;
    }
    function getOptionClassOnFreeze(id, value, correct){
        var classVal = ''
        if(frozenChoices){
            if(selectedValues[id] === decodeStr(value)){
                classVal =  value === correct ?  'correct' : 'incorrect'
            }
            else {
                classVal =  value === correct ?  'correct' : 'others'
            }
        } else {
            if(selectedValues[id] === decodeStr(value)){
                classVal = 'marked';
            }
            else {
                classVal='unmarked';
            }
        }
        return classVal;
    }

    function Question(props){
        const field = props.field;
        const id = props.id;
        return (
            <div className="qn-field">
                <p className="qn-title">{decodeStr(field.question)}</p>
                <div className="qn-options">
                    {field.options.map((value,index)=>(
                        <div 
                            key={value+index}
                            className={`option ${getOptionClassOnFreeze(id, value, field.correct_answer)}`}
                            onClick={()=>handleClick(value, id)}
                        >
                            {decodeStr(value)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    function checkAnswers(){
        setFreezeChoices(true)
        var scoreCount = 0;
        props.questionSet.forEach((item, index)=>{
            checkForMatch(decodeStr(item.correct_answer), selectedValues[index]) && ++scoreCount;
        })
        setScore(scoreCount)
        scoreCount && setConfetti(true)
    }

    return (
        <div className="questions">
            {confetti && <ConfettiComp />}
            {props.questionSet.map((itemSet, index)=>(
                <Question key={index} id={index} field={itemSet}/>
            ))}

            {!frozenChoices ? (
                <div className="btn-footer">
                    <button
                    className="btn check-btn"
                    onClick={checkAnswers}
                    >
                        Check Answers
                    </button>
                </div>
            ):
            (
               <div className="game-fin btn-footer">
                   <p className="fin-desc">You scored {score}/{props.questionSet.length} answers</p>
                   <button
                    className="btn play-btn"
                    onClick={props.restartGame}
                    >
                    Play Again
                    </button>
               </div> 
            )}  
        </div>
    )
}