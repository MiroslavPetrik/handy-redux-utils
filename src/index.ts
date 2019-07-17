import deepFreeze from 'deep-freeze';
import { Action, Reducer } from 'redux';

export type BaseAction = Action<string>;

export interface EmptyAction extends BaseAction {
  payload: undefined;
}

export interface PayloadAction<P> extends BaseAction {
  payload: P;
}

const createActionType = (...parts: string[]): string => parts.join('_');

export const createActionTypeGuard = <A extends BaseAction = EmptyAction>(type: string) => (
  action: BaseAction
): action is A => action.type === type;

export interface EmptyActionCreator {
  (): EmptyAction;
  guard: (a: BaseAction) => a is EmptyAction;
}

export const createEmptyActionCreator = (...actionType: string[]): EmptyActionCreator => {
  const type = createActionType(...actionType);
  const actionCreator = () => ({ type, payload: undefined });

  actionCreator.guard = createActionTypeGuard(type);

  return actionCreator;
};

export interface ActionCreator<P> {
  (payload: P): PayloadAction<P>;
  guard: (a: BaseAction) => a is PayloadAction<P>;
}

export const createActionCreator = <P>(...actionType: string[]): ActionCreator<P> => {
  const type = createActionType(...actionType);
  const actionCreator = (payload: P) => ({ type, payload });

  actionCreator.guard = createActionTypeGuard<PayloadAction<P>>(type);

  return actionCreator;
};

export const createInitialState = <S>(initialState: S) => deepFreeze(initialState);

export const reduceAction = <S, P>(
  actionCreator: EmptyActionCreator | ActionCreator<P>,
  reducer: (state: S, payload: P) => S
): Reducer<S, Action> => (state: S | undefined, action: Action) =>
  actionCreator.guard(action) ? reducer(state as S, action.payload as P) : (state as S);

export const createReducer = <S>(initialState: S, ...reducers: Reducer<S, Action>[]) => (
  state: S = initialState,
  action: Action
) => {
  for (let reducer of reducers) {
    const result = reducer(state, action);
    if (result != state) {
      return result;
    }
  }
  return state;
};
