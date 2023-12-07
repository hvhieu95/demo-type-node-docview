// textEditorReducer.ts
import { UPDATE_TEXT_EDITOR_CONTENT, UpdateTextEditorContentAction } from '../actions/textEditorActions';

interface TextEditorState {
  content: string;
}

const initialState: TextEditorState = {
  content: '',
};

const textEditorReducer = (state = initialState, action: UpdateTextEditorContentAction): TextEditorState => {
  switch (action.type) {
    case UPDATE_TEXT_EDITOR_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default textEditorReducer;
