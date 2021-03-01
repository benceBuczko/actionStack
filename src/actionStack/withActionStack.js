import React from 'react';
import useActionStack from "./useActionStack";

const withActionStack = (WrappedComponent, providerProps) => () => {
    const props = useActionStack(providerProps);

    return <WrappedComponent {...props}/>
};

export default withActionStack;
