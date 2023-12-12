import React, { useCallback, useState } from "react";
import { ShapeType } from "../types/shapetypes";
import { v4 as uuidv4 } from "uuid";
import CardSubTask from "./CardSubTask";
import { useDispatch, useSelector } from "react-redux";

import {
  addShape,
  updateShapePosition,
  updateShapeSize,
  removeShape,
} from "../actions/shapeActions";
import { ArrowType } from "../types/arrowtypes";
import { addArrow, removeArrow } from "../actions/arrowActions";
import { RootState } from "../reducers/rootReducer";
import Xarrow from "react-xarrows";
import { IconCreateShape } from "../icons";

interface CreateaSubTaskProps {
  shapes: ShapeType[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeType[]>>;
  groupId: string | null;
  onAddShape: (shapeType: "rectangle") => void;
}

const CreateaSubTask = React.memo(
  ({ groupId, onAddShape }: CreateaSubTaskProps) => {
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
      <div className="absolute top-20 left-0 ml-[calc(100vw_-_150px_-_20%)] z-20 flex flex-col gap-2">
        {shapes.map((shape, index) => (
          <CardSubTask
            id={shape.id}
            key={shape.id}
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

        {arrows.map((arrow: ArrowType) => (
          <Xarrow
            key={arrow.id}
            start={`connect-point-${arrow.startId}`}
            end={`connect-point-${arrow.endId}`}
          />
        ))}
      </div>
    );
  }
);

export default CreateaSubTask;
export {};
