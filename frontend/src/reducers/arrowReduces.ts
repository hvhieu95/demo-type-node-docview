// arrowReducer.ts
import { ADD_ARROW, REMOVE_ARROW,ArrowActionTypes } from '../actions/arrowActions';
import { v4 as uuidv4 } from 'uuid';
interface ArrowType {
  id: string;
  startId: string;
  endId: string;
}

interface ArrowState {
  arrows: ArrowType[];
}

const initialState: ArrowState = {
  arrows: []
};

const arrowReducer = (state = initialState, action: ArrowActionTypes): ArrowState => {
  switch (action.type) {
    case ADD_ARROW: {
      const newArrow = {
        id: uuidv4(), // Hoặc cách khác để tạo ID duy nhất
        ...action.payload
      };
      return {
        ...state,
        arrows: [...state.arrows, newArrow]
      };
    }
    case REMOVE_ARROW: {
      return {
        ...state,
        arrows: state.arrows.filter(arrow => arrow.id !== action.payload)
      };
    }
    default:
      return state;
  }
};

export default arrowReducer;
