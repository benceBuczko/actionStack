import React from 'react';
import useActionStack from "./useActionStack";
import {ActionStackContext} from "./ActionStackContext";

const ActionStack = ({initialValue, onUpdate, children}) => {
    const props = useActionStack({initialValue, onUpdate});

    return (
        <ActionStackContext.Provider value={props}>
            {children}
        </ActionStackContext.Provider>
    )
};

export default ActionStack;
