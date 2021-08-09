import { Action } from '@ngrx/store';
export const initialState = '';
export const SET_LOCATION = 'SET_LOCATION';
export function locationReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_LOCATION:
            return [...state, action.payload];
        default:
            return state;
    }
}