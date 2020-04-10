import { GET_USER_DETAILS } from "../../actions/types";

const initialState = {
    userdetails: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            console.log("reducers", action.payload)
            return {

                ...state,
                userdetails: action.payload
            };
        default:
            return state;
    }
}
