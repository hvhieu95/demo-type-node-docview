import { GroupType } from "../types/grouptypes";
import { ADD_GROUP, REMOVE_GROUP, SELECT_GROUP, UPDATE_GROUP } from '../actions/groupActions';



interface GroupState {
  groups: GroupType[];
  selectedGroupId: string | null;
  
}

const initialState: GroupState = {
  groups: [],
  selectedGroupId: null,
  
};

const groupReducer = (
  state = initialState,
  action: any 
): GroupState => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
      };
    case SELECT_GROUP:
      return {
        ...state,
        selectedGroupId: action.payload,
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId ? { ...group, name: action.payload.text } : group
        ),
      };
    default:
      return state;
  }
};

export default groupReducer;
