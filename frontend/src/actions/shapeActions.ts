import { ShapeType } from "../types/shapetypes";
// Action Types
export const ADD_SHAPE = 'ADD_SHAPE';
export const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION';
export const UPDATE_SHAPE_SIZE = 'UPDATE_SHAPE_SIZE';
export const UPDATE_SHAPE_TEXT = 'UPDATE_SHAPE_TEXT';
export const REMOVE_SHAPE = 'REMOVE_SHAPE';
// Action
export const addShape = (shape: ShapeType) => ({
  type: ADD_SHAPE,
  payload: shape
});

export const updateShapePosition = (id: string, position: { x: number; y: number }) => ({
  type: UPDATE_SHAPE_POSITION,
  payload: { id, position }
});

export const updateShapeSize = (id: string, size: { width: number; height: number }) => ({
  type: UPDATE_SHAPE_SIZE,
  payload: { id, size }
});

export const updateShapeText = (id: string, text: string) => ({
  type: UPDATE_SHAPE_TEXT,
  payload: { id, text }
});

export const removeShape = (id: string) => ({
  type: REMOVE_SHAPE,
  payload: id
});
