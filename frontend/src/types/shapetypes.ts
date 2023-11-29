export type ShapeType = {
    id: string;
    type: "circle" | "rectangle" | "square" | "triangle" | "arrow" | "Rhombus" | "message";
    position: { x: number; y: number };
    size: { width: number; height: number };
    text: string;
    groupId: string | null;
  };