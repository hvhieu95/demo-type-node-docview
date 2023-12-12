// types/shapetypes.ts
export type ShapeType = {
    id: string;
    type:  "rectangle";
    position: { x: number; y: number };
    size: { width: number; height: number };
    text: string;
    groupId: string | null;
  };