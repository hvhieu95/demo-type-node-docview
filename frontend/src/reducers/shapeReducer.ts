import { ShapeType } from "../types/shapetypes";
import { ArrowType } from "../types/arrowtypes";
import {
  ADD_SHAPE,
  UPDATE_SHAPE_POSITION,
  UPDATE_SHAPE_SIZE,
  UPDATE_SHAPE_TEXT,
  REMOVE_SHAPE,
} from "../actions/shapeActions";

// Giả sử các hành động của bạn đều có dạng này
interface ShapeAction {
  type: string;
  payload: any;
}

interface ShapeState {
  shapes: { [id: string]: ShapeType };
  arrows: ArrowType[];
}

const initialState: ShapeState = {
  shapes: {},
  arrows: []
};

const shapeReducer = (state = initialState, action: ShapeAction): ShapeState => {
  switch (action.type) {
    case ADD_SHAPE: {
      const { id } = action.payload; 
      return {
        ...state,
        shapes: {
          ...state.shapes,
          [id]: action.payload
        }
      };
    }
    case UPDATE_SHAPE_POSITION: {
      const { id, position } = action.payload;
      return {
        ...state,
        shapes: {
          ...state.shapes,
          [id]: {
            ...state.shapes[id],
            position: position
          }
        }
      };
    }
    case UPDATE_SHAPE_SIZE: {
      const { id, size } = action.payload;
      return {
        ...state,
        shapes: {
          ...state.shapes,
          [id]: {
            ...state.shapes[id],
            size: size
          }
        }
      };
    }
    case UPDATE_SHAPE_TEXT: {
      const { id, text } = action.payload;
      return {
        ...state,
        shapes: {
          ...state.shapes,
          [id]: {
            ...state.shapes[id],
            text: text
          }
        }
      };
    }
    case REMOVE_SHAPE: {
      const { [action.payload]: removedShape, ...restShapes } = state.shapes;
      return {
        ...state,
        shapes: restShapes
      };
    }
    default:
      return state;
  }
};

export default shapeReducer;
