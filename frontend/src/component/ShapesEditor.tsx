import React, { useCallback, useState } from "react";
import { ShapeType } from "../types/shapetypes";
import { v4 as uuidv4 } from "uuid";
import DraggableCard from "./DraggableCard";
import { useDispatch, useSelector } from "react-redux";

import {
  addShape,
  updateShapePosition,
  updateShapeSize,
  removeShape,
} from "../actions/shapeActions";
import { ArrowType } from "../types/arrowtypes";
import { addArrow ,removeArrow} from "../actions/arrowActions";
import { RootState } from "../reducers/rootReducer";
import Xarrow from "react-xarrows";


interface ShapesEditorProps {
  shapes: ShapeType[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeType[]>>;
  groupId: string | null;
}

const ShapesEditor = React.memo(({ groupId }: ShapesEditorProps) => {
  // Lấy dispatch từ redux
  const dispatch = useDispatch();
  const arrows = useSelector((state: RootState) => state.arrow.arrows);
  const shapes = useSelector((state: RootState) =>
    Object.values(state.shape.shapes).filter(
      (shape) => shape.groupId === groupId
    )
  );

  const handleConnect = (startId: string, endId: string) => {
    dispatch(addArrow(startId, endId));
  };
  

  // hàm thêm shape
  const handleaddShape = useCallback(
    (shapeType: ShapeType["type"]) => {
      if (!groupId) {
        console.error("Cannot add shape when no group is selected");
        return;
      }
      const newShapeId = uuidv4();
      const newShape = {
        id: newShapeId,
        groupId: groupId,
        type: shapeType,
        position: { x: 0, y: 0 },
        size: { width: 150, height: 150 },
        text: "",
      };
      console.log("Adding new shape", newShape);

      // Cập nhật state hoặc store với shape
      dispatch(addShape(newShape));
    },
    [dispatch, groupId]
  );

  // hàm cập nhật vị trí của shape
  const onUpdateShapePosition = useCallback(
    (shapeId: string, position: { x: number; y: number }) => {
      // Gửi action cập nhật vị trí shape
      dispatch(updateShapePosition(shapeId, position));
    },
    [dispatch]
  );

  // hàm cập nhật size của shape
  const HandleUpdatedShapeSize = useCallback(
    (shapeId: string, size: { width: number; height: number }) => {
      // Gửi action cập nhật kích thước shape
      dispatch(updateShapeSize(shapeId, size));
    },
    [dispatch]
  );

  // hàm xóa shape
  const HandleRemoveShape = useCallback(
    (shapeId: string) => {
      // Gửi action xóa shape
      dispatch(removeShape(shapeId));
    },
    [dispatch] // Sử dụng dispatch trong dependencies
  );

  return (
    <div>
      <div className="shapes-container">
        {shapes.map((shape, index) => (
          <DraggableCard
            id={shape.id}
            key={index}
            shape={shape.type}
            position={shape.position}
            size={shape.size}
            onResize={(size) => HandleUpdatedShapeSize(shape.id, size)}
            text={shape.text}
            onRemove={() => HandleRemoveShape(shape.id)}
            onUpdatePosition={(position) =>
              onUpdateShapePosition(shape.id, position)
            }
            onConnect={handleConnect}
          
          />
        ))}
   
        {arrows.map((arrow:ArrowType) => (
          <Xarrow
            key={arrow.id}
            start={`connect-point-${arrow.startId}`}
            end={`connect-point-${arrow.endId}`}
        
          />
        ))}
      </div>

      <div className="button-shape-container">
        <button onClick={() => handleaddShape("square")}>Square</button>
        <button onClick={() => handleaddShape("rectangle")}>Rectangle</button>
        <button onClick={() => handleaddShape("circle")}>Circle</button>
        <button onClick={() => handleaddShape("triangle")}>Triangle</button>
        <button onClick={() => handleaddShape("arrow")}>Arrow</button>
        <button onClick={() => handleaddShape("Rhombus")}>Rhombus</button>
        <button onClick={() => handleaddShape("message")}>message</button>
      </div>
    </div>
  );
});

export default ShapesEditor;
export {};
