

import React, { useCallback } from "react";
import DraggableCard from "./DraggableCard";
import { ShapeType } from "./DocumentViewer";

interface ShapesEditorProps {
  shapes: ShapeType[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeType[]>>;
}

const ShapesEditor = React.memo(({ shapes, setShapes }: ShapesEditorProps) => {
  const onUpdateShapePosition = useCallback(
    (index: number, position: { x: number; y: number }) => {
      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];
        newShapes[index] = { ...newShapes[index], position };
        return newShapes;
      });
    },
    [setShapes]
  );
  // const onRotateShape = useCallback((index:number, rotateAngle:number) => {
  //   setShapes((prevShapes) => {
  //     const newShapes = [...prevShapes];
  //     newShapes[index] = { ...newShapes[index], rotateAngle };
  //     return newShapes;
  //   });
  // }, []);
  const updateShapeText = useCallback(
    (index: number, text: string) => {
      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];
        newShapes[index] = { ...newShapes[index], text };
        return newShapes;
      });
    },
    [setShapes]
  );
  const updatedShapeSize = useCallback(
    (index: number, size: { width: number; height: number }) => {
      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];
        newShapes[index] = { ...newShapes[index], size };
        return newShapes;
      });
    },
    [setShapes]
  );

  const removeShape = useCallback(
    (indexToRemove: number) => {
      setShapes((prevShapes) =>
        prevShapes.filter((_, index) => index !== indexToRemove)
      );
    },
    [setShapes]
  );

  const addShape = useCallback(
    (shapeType: ShapeType["type"]) => {
      const newShape = {
        type: shapeType,
        position: { x: 0, y: 0 },
        size: { width: 150, height: 150 },
        // rotateAngle: 0,
        text: "",
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
    },
    [setShapes]
  );

  return (
    <div>
      <div className="shapes-container">
        {shapes.map((shape, index) => (
          <DraggableCard
            key={index}
            shape={shape.type}
            position={shape.position}
            size={shape.size}
            onResize={(size) => updatedShapeSize(index, size)}
            text={shape.text}
            onTextChange={(newText) => updateShapeText(index, newText)}
            onRemove={() => removeShape(index)}
            onUpdatePosition={(position) =>
              onUpdateShapePosition(index, position)
            }
            // rotateAngle={shape.rotateAngle}
            // onRotate={(rotateAngle) => onRotateShape(index, rotateAngle)}
          />
        ))}
      </div>
      <div className="button-shape-container">
        <button onClick={() => addShape("square")}>Square</button>
        <button onClick={() => addShape("circle")}>Circle</button>
        <button onClick={() => addShape("triangle")}>Triangle</button>
        <button onClick={() => addShape("arrow")}>Arrow</button>
        <button onClick={() => addShape("Rhombus")}>Rhombus</button>
        <button onClick={() => addShape("message")}>
          message
        </button>
      </div>
    </div>
  );
});

export default ShapesEditor;
export {};
