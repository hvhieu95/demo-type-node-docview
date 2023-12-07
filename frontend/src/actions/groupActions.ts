import { GroupType } from '../types/grouptypes';



export const ADD_GROUP = 'ADD_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';
export const SELECT_GROUP = 'SELECT_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
  // Định nghĩa type cho action
  export type AddGroupAction = {
    type: "ADD_GROUP";
    payload: GroupType;
  };
  export type RemoveGroupAction = {
    type: "REMOVE_GROUP";
    payload: string; 
  };
  export type SelectGroupAction = { 
    type:"SELECT_GROUP";
    payload: string | null;
  };
  
  export type UpdateGroupAction = {
    type:"UPDATE_GROUP";
    payload: { groupId: string; text: string; };
  };
  
  export const addGroup = (group: GroupType): AddGroupAction => ({
    type: ADD_GROUP,
    payload: group
  });
  export const removeGroup = (groupId:string) => ({
    type: REMOVE_GROUP,
    payload: groupId,
  });
  export const selectGroup = (groupId: string | null): SelectGroupAction => ({
    type: SELECT_GROUP,
    payload: groupId,
  });
  
  export const updateGroup = (groupId: string, text: string): UpdateGroupAction => ({ 
    type: UPDATE_GROUP,
    payload: { groupId, text },
  });