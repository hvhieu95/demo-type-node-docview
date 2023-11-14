import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import RichTextEditor from "./EditText";

type ShapeType =
  | "circle"
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
  onTextChange: (text: string) => void;
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
    onTextChange,
    size,
    onResize,
  }: DraggableCardProps) => {
    const [disableDragging, setDisableDragging] = useState<boolean>(false);
    const [showResizeHandles, setShowResizeHandles] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const shapeStyles: { [key in ShapeType]: React.CSSProperties } = {
      square: {},
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

    const handleDoubleClick = () => {
      setIsEditing(true);
      setDisableDragging(true); // cho phép chỉnh sửa và ngăn ngừa kéo thả khi doupleclick
    };

    const handleMouseLeaveEditor = () => {
      setIsEditing(false); // Tắt chế độ chỉnh sửa khi dời chuột
      setDisableDragging(false); // đặt lại chế độ kéo thả khi edit xong
    };

    return (
      <div
        onDoubleClick={handleDoubleClick}
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
            >
              {isEditing ? (
                // Sử dụng MyRichTextEditor khi đang trong chế độ chỉnh sửa
                <div
                  onMouseLeave={handleMouseLeaveEditor}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: 0,
                    width: "500px",
                    height: "200px",
                    zIndex: 1000,
                  }}
                >
                  <RichTextEditor
                    text={text}
                    onTextChange={onTextChange}
                    placeholder="Enter some text..."
                  />
                </div>
              ) : (
                //Render nội dung đã định dạng khi không chỉnh sửa
                <div
                  style={{
                    ...shapeStyles[shape],
                    backgroundColor: "lightblue",
                    resize: "none",
                    border: "none",
                    outline: "none",
                    flex: 1,
                    textAlign: "center",
                    padding: "30px",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                  dangerouslySetInnerHTML={{ __html: text }} // Sử dụng dangerouslySetInnerHTML để hiển thị HTML
                />
              )}
            </ResizableBox>
          </div>
        </Draggable>
      </div>
    );
  }
);

export default DraggableCard;
