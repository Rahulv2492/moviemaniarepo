import * as Actions from './../actions/homeActionType';
const initialState = {
    movielist: [],
    movielistbyid:[],
    listHide:false

    
}

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.API_MOVIELIST_SUCCESS:
            return Object.assign({}, state, {
                movielist:action.data
            });
        case Actions.API_MOVIELISTBYID_SUCCESS:
            return Object.assign({}, state, {
                movielistbyid:action.data
            });
            case Actions.LIST_HIDE:
            return Object.assign({}, state, {
                listHide:action.val
            });
        default:
            return state;
    }
}

export default HomeReducer;
