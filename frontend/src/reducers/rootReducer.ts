// rootReducer.ts
import { combineReducers } from 'redux';
import groupReducer from './groupReducer'; 
import shapeReducer from './shapeReducer';
import textEditorReducer from './textEditorReducer';

const rootReducer = combineReducers({
  group: groupReducer,
  shape: shapeReducer,
  textEditor: textEditorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;