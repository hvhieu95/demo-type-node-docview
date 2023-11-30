import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type ShapeType =
  | "circle"
  | "rectangle"
  | "square"
  | "triangle"
  | "arrow"
  | "Rhombus"
  | "message";
type DraggableCardProps = {
  shape: ShapeType;
  onRemove: () => void;
  position: { x: number; y: number };
  onUpdatePosition: (position: { x: number; y: number }) => void;
  text: string;

  size: { width: number; height: number };
  onResize: (size: { width: number; height: number }) => void;
};
const DraggableCard = React.memo(
  ({
    shape,
    onRemove,
    position,
    onUpdatePosition,
    text,
    size,
    onResize,
  }: DraggableCardProps) => {
    const [disableDragging, setDisableDragging] = useState<boolean>(false);
    const [showResizeHandles, setShowResizeHandles] = useState(false);

    const shapeStyles: { [key in ShapeType]: React.CSSProperties } = {
      square: {},
      rectangle: {
        backgroundColor: "blue",
        width: "100%",
        height: "100%",
      },
      circle: {
        borderRadius: "50%",
      },
      triangle: {
        clipPath: " polygon(50% 0%, 0% 100%, 100% 100%)",
      },
      arrow: {
        clipPath:
          "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
      },
      Rhombus: {
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      },
      message: {
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
      },
    };

    const handleStart = () => {
      setDisableDragging(true);
      setShowResizeHandles(true);
    };
    const handleDrag = (e: any, data: any) => {
      console.log("Dragging to", data.x, data.y);
      onUpdatePosition({ x: data.x, y: data.y });
    };
    const handleStop = () => {
      setDisableDragging(false);
      setShowResizeHandles(false);
    };

    const handleResize = (
      event: any,
      { size }: { size: { width: number; height: number } }
    ) => {
      onResize(size);
    };
    const handleMouseEnter = () => {
      setShowResizeHandles(true); // Hiển thị resizeHandles khi chuột nhập vào
    };
    const handleMouseLeaveShapes = () => {
      setShowResizeHandles(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Delete") {
        onRemove();
      }
    };

    return (
      <div
        className=" draggable-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveShapes}
        style={{ position: "relative", border: "none" }}
      >
        <Draggable
          disabled={disableDragging}
          onStart={handleStart}
          onStop={handleStop}
          position={position}
          onDrag={handleDrag}
        >
          <div onKeyDown={handleKeyDown} tabIndex={0}>
            <ResizableBox
              resizeHandles={
                showResizeHandles
                  ? ["nw", "ne", "sw", "se", "n", "e", "s", "w"]
                  : []
              }
              width={size.width}
              height={size.height}
              onResize={handleResize}
              style={{
                ...shapeStyles[shape],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lightblue",
                border: "none",
              }}
            ></ResizableBox>
          </div>
        </Draggable>
      </div>
    );
  }
);

export default DraggableCard;
