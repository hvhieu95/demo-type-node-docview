
// arrowActions.ts


export const ADD_ARROW = 'ADD_ARROW';
export const REMOVE_ARROW = 'REMOVE_ARROW';

interface AddArrowAction {
  type:typeof ADD_ARROW;
  payload:{startId:string,endId:string};
}

interface RemoveArrowAction {
  type: typeof REMOVE_ARROW;
  payload: string; 
}


export const addArrow = (startId: string, endId: string):AddArrowAction => ({
  type: ADD_ARROW,
  payload: { startId, endId }
});

export const removeArrow = (arrowId: string):RemoveArrowAction => ({
  type: REMOVE_ARROW,
  payload: arrowId
});
export type ArrowActionTypes = AddArrowAction | RemoveArrowAction;