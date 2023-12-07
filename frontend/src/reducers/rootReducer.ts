// rootReducer.ts
import { combineReducers } from "redux";
import groupReducer from "./groupReducer";
import shapeReducer from "./shapeReducer";

import textEditorReducer from "./textEditorReducer";

import arrowReducer from "./arrowReduces";

const rootReducer = combineReducers({
  group: groupReducer,
  shape: shapeReducer,
  textEditor: textEditorReducer,
 
  arrow: arrowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
