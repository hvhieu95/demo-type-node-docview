// store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // sử dụng localStorage
import thunk from 'redux-thunk';
import groupReducer from './reducers/groupReducer';
import shapeReducer from './reducers/shapeReducer';

// Cấu hình cho redux-persist
const persistConfig = {
  key: 'root', // Key dùng để lưu trữ trong localStorage
  storage, // Định nghĩa loại storage
};

const rootReducer = combineReducers({
  group: groupReducer,
  shape: shapeReducer,
});

// Wrap rootReducer bằng persistReducer với cấu hình đã định nghĩa
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

// Tạo store với persistedReducer thay vì rootReducer trực tiếp
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Tạo persistor để sử dụng với PersistGate
const persistor = persistStore(store);

// Xuất khẩu cả store và persistor
export { store, persistor };
