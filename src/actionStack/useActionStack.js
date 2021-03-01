import {useState} from "react";

const useActionStack = ({ initialValue, onUpdate }) => {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [isUndoAvailable, setIsUndoAvailable] = useState(false);
    const [isRedoAvailable, setIsRedoAvailable] = useState(false);
    const [stack, setStack] = useState([]);
    const [currentIndexOfStack, setCurrentIndexOfStack] = useState(0);

    const saveNewValue = newValue => {
        setCurrentValue(newValue);
        onUpdate(newValue);
    };

    const onAction = changes => {
        const oldAndNewValuePairs = Object.keys(changes).reduce((acc, key) => ({
            oldValues: {
                ...acc.oldValues,
                [key]: currentValue[key]
            },
            newValues: {
                ...acc.newValues,
                [key]: changes[key]
            },
        }), {});

        const newStack = [...stack.slice(0, currentIndexOfStack + 1), oldAndNewValuePairs];
        setStack(newStack);
        setCurrentIndexOfStack(newStack.length - 1);
        setIsRedoAvailable(false);
        setIsUndoAvailable(true);

        setCurrentValue({
            ...currentValue,
            ...changes,
        });
    };

    const onUndo = (numberOfSteps = 1) => {
        if (isUndoAvailable) {
            let newValue = {
                ...currentValue,
            };
            for (let i = 0; i < numberOfSteps; i++) {
                const newCurrentIndexOfSteps = currentIndexOfStack - i;
                newValue = {
                    ...newValue,
                    ...stack[newCurrentIndexOfSteps].oldValues
                };
                setCurrentIndexOfStack(newCurrentIndexOfSteps - 1);
                if (newCurrentIndexOfSteps === 0) {
                    setIsUndoAvailable(false);
                    break;
                }
            }

            setIsRedoAvailable(true);
            saveNewValue(newValue)
        }
    };

    const onRedo = (numberOfSteps = 1)  => {
        if (isRedoAvailable) {
            let newValue = {
                ...currentValue,
            };
            for (let i = 0; i < numberOfSteps; i++) {
                const newCurrentIndexOfSteps = currentIndexOfStack + 1 + i;
                newValue = {
                    ...newValue,
                    ...stack[newCurrentIndexOfSteps].newValues
                };
                setCurrentIndexOfStack(newCurrentIndexOfSteps);
                if (newCurrentIndexOfSteps === stack.length - 1) {
                    setIsRedoAvailable(false);
                    break;
                }
            }

            setIsUndoAvailable(true);
            saveNewValue(newValue);
        }
    };

    return {
        onAction,
        onUndo,
        onRedo,
        isUndoAvailable,
        isRedoAvailable,
        stackLength: stack.length,
    }
};

export default useActionStack;
