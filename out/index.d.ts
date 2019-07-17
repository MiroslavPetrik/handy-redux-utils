import deepFreeze from 'deep-freeze';
import { Action, Reducer } from 'redux';
export declare type BaseAction = Action<string>;
export interface EmptyAction extends BaseAction {
    payload: undefined;
}
export interface PayloadAction<P> extends BaseAction {
    payload: P;
}
export declare const createActionTypeGuard: <A extends Action<string> = EmptyAction>(type: string) => (action: Action<string>) => action is A;
export interface EmptyActionCreator {
    (): EmptyAction;
    guard: (a: BaseAction) => a is EmptyAction;
}
export declare const createEmptyActionCreator: (...actionType: string[]) => EmptyActionCreator;
export interface ActionCreator<P> {
    (payload: P): PayloadAction<P>;
    guard: (a: BaseAction) => a is PayloadAction<P>;
}
export declare const createActionCreator: <P>(...actionType: string[]) => ActionCreator<P>;
export declare const createInitialState: <S>(initialState: S) => deepFreeze.DeepReadonly<S>;
export declare const reduceAction: <S, P>(actionCreator: EmptyActionCreator | ActionCreator<P>, reducer: (state: S, payload: P) => S) => Reducer<S, Action<any>>;
export declare const createReducer: <S>(initialState: S, ...reducers: Reducer<S, Action<any>>[]) => (state: S, action: Action<any>) => S;
