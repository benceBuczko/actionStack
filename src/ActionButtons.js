import React, {useContext} from "react";
import {ActionStackContext} from "./actionStack/ActionStackContext";

export const ActionButtons = ({ stackLength, onAction, onUndo, onRedo, isUndoAvailable, isRedoAvailable }) => (
    <div>
        <p>
            Length of the stack : {stackLength}
        </p>

        <button onClick={() => onAction({test: Math.random()})}>OnAction</button>

        <button disabled={!isUndoAvailable} onClick={() => onUndo()}>Undo</button>

        <button disabled={!isRedoAvailable} onClick={() => onRedo()}>Redo</button>
    </div>
);

export const ActionButtonsReadingFromContext = () => {
    const { stackLength, onAction, onUndo, onRedo, isUndoAvailable, isRedoAvailable } = useContext(ActionStackContext);

    return (
        <div>
            <p>
                Length of the stack : {stackLength}
            </p>

            <button onClick={() => onAction({test: Math.random()})}>OnAction</button>

            <button disabled={!isUndoAvailable} onClick={() => onUndo(2)}>Undo</button>

            <button disabled={!isRedoAvailable} onClick={() => onRedo(2)}>Redo</button>
        </div>
    )
};

