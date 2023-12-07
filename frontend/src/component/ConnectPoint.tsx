import React, { useRef, useState, useEffect } from "react";


interface ConnectPointProps {
  cardId: string;
  onConnect: (startId: string, endId: string) => void;
}

const ConnectPoint = ({ cardId, onConnect }: ConnectPointProps) => {
  const connectPointId = `connect-point-${cardId}`;
  const [beingDragged, setBeingDragged] = useState(false);
  const [position, setPosition] = useState({});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setBeingDragged(true);
    e.dataTransfer.setData("sourceId", cardId);
    e.dataTransfer.effectAllowed = "move";
    e.stopPropagation();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setBeingDragged(false);
    const endId = e.dataTransfer.getData("targetId");
    if (endId && endId !== cardId) {
      onConnect(cardId, endId);
    }
    setPosition({});
  };

  return (
    <>
      <div
        id={`connect-point-${cardId}`}
        className="connect-point absolute top-0 right-10 w-3.5 h-3.5 bg-blue-300 cursor-grabbing "
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    
    </>
  );
};

export default ConnectPoint;
