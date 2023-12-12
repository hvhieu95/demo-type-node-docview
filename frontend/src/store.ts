// store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // sử dụng localStorage
import thunk from 'redux-thunk';
import groupReducer from './reducers/groupReducer';
import shapeReducer from './reducers/shapeReducer';
import textEditorReducer from './reducers/textEditorReducer';
import taskReducer from './slice/taskSlice';
import { useDispatch } from 'react-redux';

import arrowReducer from './reducers/arrowReduces';
// Cấu hình cho redux-persist
const persistConfig = {
  key: 'root', // Key dùng để lưu trữ trong localStorage
  storage, // Định nghĩa loại storage
};

const rootReducer = combineReducers({
  group: groupReducer,
  shape: shapeReducer,
  arrow: arrowReducer,
  textEditor: textEditorReducer,
  tasks: taskReducer,
});

// Wrap rootReducer bằng persistReducer với cấu hình đã định nghĩa
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootStateTask = ReturnType<typeof rootReducer>;

// Tạo store với persistedReducer thay vì rootReducer trực tiếp
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Tạo persistor để sử dụng với PersistGate
const persistor = persistStore(store);

// Xuất khẩu cả store và persistor
export { store, persistor };
// Tạo loại AppDispatch dựa trên loại dispatch của store
type AppDispatch = typeof store.dispatch;

// Tạo custom hook để sử dụng dispatch với loại đã được chỉ rõ
export const useAppDispatch = () => useDispatch<AppDispatch>();