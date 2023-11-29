// rootReducer.ts
import { combineReducers } from 'redux';
import groupReducer from './groupReducer'; 
import shapeReducer from './shapeReducer';
import { GroupType } from "../types/grouptypes"; // Đảm bảo import này đúng

const rootReducer = combineReducers({
  group: groupReducer,
  shape: shapeReducer,
  
});

export type RootState = ReturnType<typeof rootReducer>;