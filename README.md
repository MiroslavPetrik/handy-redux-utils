# handy-redux
A set of handy & typed redux utils.

## Example Usage

```typescript
import { takeLatest, call, put } from 'redux-saga';
import {
  createActionCreator,
  createEmptyActionCreator,
  createInitialState,
  createReducer,
  reduceAction
} from 'handy-redux';

type LoginResponse = {
  token: string;
  user: {
    id: string;
  }
};

type Credentials = {
  email: string;
  password: string;
}

// Use `createActionCreator<T>(name)` for action with payload
const loginRequestAction = createActionCreator<Credentials>('user/LOGIN_REQUEST');
const loginSuccessAction = createActionCreator<LoginResponse>('user/LOGIN_SUCCESS');

// Use `createEmptyActionCreator()` for action without payload
const logoutAction = createEmptyActionCreator('user/LOGOUT');

type UserState = {
  profile?: {
    id: string;
    email: string;
  };
}

// Use `createInitialState<T>(initialState)` to define initial state
const initialUserState = createInitialState<UserState>({
  profile: undefined,
});

// Use `createReducer(state, ...actionsReducers)`
// and `reduceAction(action, (state, payload) => nextState)` to reduce actions
const user = createReducer(initialUserState.profile,
  reduceAction(loginSuccessAction, (_, { user: profile }) => profile),
  reduceAction(logoutAction, () => undefined)
);

// Use `action.guard` for action pattern-matching in sagas
const login = takeLatest(loginRequestAction.guard, function*({ payload }) {
  try {
    const resp: LoginResponse = yield call(api.login, payload.email, payload.password);

    yield put(loginSuccessAction(resp));
  } catch {
    console.error("Failed to login.");
  }
});

export function* userSaga() {
  yield login;
}
```
