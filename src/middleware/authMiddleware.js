let login = false;

export default function authMiddleware({getState, dispatch}) {
    return (next) => (action) => {
        if (typeof action === 'object' && action.hasOwnProperty('type')) {
            // if (action.type !== 'ADD_BROWSER_HISTORY') {
        //         next(action); // send it to next so identity will be set
        //
        //         // get current route
                const state = getState();
        //         let path = '/dashboard';
        //
        //         if (typeof state['router'] === 'object' && typeof state['router']['route'] === 'object' && null !== state['router']['route']) {
        //             if (state.router.route.name === 'login' && typeof state.router.route.query['to'] === 'string') {
        //                 path = state.router.route.query.to;
        //             }
        //         }
        //
        //         return next(actions.transitionTo(path));
        //     }
            console.log('middleware state:', state, action);

        }
        return next(action);
    };
}