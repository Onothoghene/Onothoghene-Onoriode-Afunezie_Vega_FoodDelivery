import React from 'react';

const SortBar = ({ onCommentsToShowChange }) => {
    return (
        // <div className="form-floating">
        //     <select className="form-select" id="floatingSelect"
        //         aria-label="Floating label select example"
        //         onChange={(e) => onSortChange(e.target.value)}>
        //         <option selected>Open this select menu</option>
        //         <option value="default">Default</option>
        //         <option value="highest">Highest Rating</option>
        //         <option value="lowest">Lowest Rating</option>
        //     </select>
        //     <label htmlFor="floatingSelect">Sort by:</label>
        // </div>
        <div className="form-floating">
            <select className="form-select" id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => onCommentsToShowChange(Number(e.target.value))}>
                <option value="1">1 comment</option>
                <option value="3">3 comments</option>
                <option value="5">5 comments</option>
                <option value="10">10 comments</option>
            </select>
            <label htmlFor="floatingSelect">Sort by:</label>
        </div>
    );
};

export default SortBar;
