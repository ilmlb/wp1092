export default function Header({info}){

    return (
        <>
        <h1 id="title">Merging School</h1>
        <div className="btn-groups">
            <div className="qs-ranking" id="general-qs-ranking">QS: <p id="general-qs-ranking-value">{info.qs_ranking}</p></div>
            <div className="qs-ranking" id="general-step">Step: <p id="general-step-value">{info.step}</p></div>
            <div className="qs-ranking" id="best-qs-ranking">Best: <p id="best-qs-ranking-value">{info.best_qs_ranking}</p></div>
            <div className="button" id="reset-button" >New Game</div>
        </div>
        </>
    );
}