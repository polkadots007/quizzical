export default function Start(props){
    return (
        <section className="start-section">
            <h2 className="game-title">Quizzical</h2>
            <p className="game-desc">What do you know about Television shows? Lets See!</p>
            <button 
            className="btn start-btn"
            onClick={props.playGame}
            >
                Start Quiz
            </button>
        </section>
    )
}