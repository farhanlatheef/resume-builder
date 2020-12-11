import { combineReducers } from 'redux';

// import { authentication } from './authentication.reducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
import { alert } from './alertReducer';
import { resume } from './resumeReducer';

const rootReducer = combineReducers({
    // authentication,
    // registration,
    // users,
    alert,
    resume
});

export default rootReducer;