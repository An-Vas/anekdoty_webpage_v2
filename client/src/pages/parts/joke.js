import React from 'react';

function Joke({text, id, rank, index, onClickVoteUp, onClickVoteDown, isUp, isDown}) {


    const classNameUp = `text-block__vote-button${isUp ? "_ChosenUp" : ""}`
    const classNameDown = `text-block__vote-button${isDown ? "_ChosenDown" : ""}`


    return (

        <div className="text-block" data-id="1">
            <p className="text-block-body">{text}</p>
            <div className="text-block__id">{id}</div>

            <div className="rank-block">
                <button className={classNameUp} onClick={() => onClickVoteUp(id, index)}>
                    ▲
                </button>
                <p className="rank-content"> {" rank:" + rank}</p>
                <button className={classNameDown} onClick={() => onClickVoteDown(id, index)}>
                    ▼
                </button>
            </div>
        </div>

    );
}

export default Joke;