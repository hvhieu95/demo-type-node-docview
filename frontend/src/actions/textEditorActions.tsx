// textEditorActions.ts
export const UPDATE_TEXT_EDITOR_CONTENT = 'UPDATE_TEXT_EDITOR_CONTENT';

export interface UpdateTextEditorContentAction {
  type: typeof UPDATE_TEXT_EDITOR_CONTENT;
  payload: string;
}

export const updateTextEditorContent = (content: string): UpdateTextEditorContentAction => ({
  type: UPDATE_TEXT_EDITOR_CONTENT,
  payload: content,
});
