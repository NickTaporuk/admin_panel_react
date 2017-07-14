export const loadLocalStorage =  (name) => {
    try {
        const serializedState = localStorage.getItem(name);
        if(serializedState === null) return undefined;

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveStateToLocalStorage = (name,state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(name, serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

export const resetStateToLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (err) {
        // Ignore write errors
    }
};