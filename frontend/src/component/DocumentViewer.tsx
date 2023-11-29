import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DocumentType } from "../documents";
import Content from "../component/Content";
import { useDocuments } from "../DocumentContext";
import { useNavigate } from "react-router-dom";
import FileViewer from "./FileViewer";
import ShapesEditor from "./ShapesEditor";
import { v4 as uuidv4 } from "uuid";
import { ShapeType } from "../types/shapetypes";
import { GroupType } from "../types/grouptypes";
import {
  addGroup,
  removeGroup,
  selectGroup,
  updateGroup,
} from "../actions/groupActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/rootReducer";

interface DocumentViewerProps {
  updateDocumentsState?: (updatedDocuments: DocumentType[]) => void;
}

const DocumentViewer = ({ updateDocumentsState }: DocumentViewerProps) => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const docViewerRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<string>("");
  const [assign, setAssign] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { documents: globalDocuments, setDocuments: setGlobalDocuments } =
    useDocuments();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const groups = useSelector((state: RootState) => state.group.groups);
  const selectedGroupId = useSelector(
    (state: RootState) => state.group.selectedGroupId
  );

  // Hàm thêm một group mới
  const addNewGroup = () => {
    const newGroupId = uuidv4();
    const newGroup: GroupType = {
      id: newGroupId,
      name: `Comment ${groups.length + 1}`,
      shapeIds: [],
    };
    dispatch(addGroup(newGroup));
  };
  // Hàm chọn một group
  const SelectGroup = (groupId: string) => {
    dispatch(selectGroup(groupId));
  };

  // hàm cập nhật văn bản cho mỗi nhóm
  const updateGroupText = (groupId: string, newText: string) => {
    dispatch(updateGroup(groupId, newText));
  };
  // hàm xóa 1 group
  const handleRemoveGroup = (groupId: string) => {
    dispatch(removeGroup(groupId));
  };
// hàm lấy các thẻ con từ thẻ cha
  const selectedGroupShapes = shapes.filter(
    (shape) => shape.groupId === selectedGroupId
  );

  useEffect(() => {
    const foundDocument = globalDocuments.find((doc) => doc.id === id);
    if (foundDocument) {
      setDocument(foundDocument);
      setAssign(foundDocument.assign || "");
      setStatus(foundDocument.status || "");
    } else {
      setDocument(null);
    }

    const savedData = localStorage.getItem(`documentData_${id}`);
    if (savedData) {
      const { shapes, comment, assign, status } = JSON.parse(savedData);
      setShapes(shapes);
      setComment(comment);
      setAssign(assign);
      setStatus(status);
    }
  }, [id, globalDocuments]);

  const handleSave = useCallback(() => {
    if (document && (shapes.length > 0 || comment || assign || status)) {
      const dataToSave = { shapes, comment, assign, status };
      localStorage.setItem(`documentData_${id}`, JSON.stringify(dataToSave));
      alert("データが保存されました!");

      const updatedDocument = { ...document, assign, status };
      const updatedGlobalDocuments = globalDocuments.map((doc) =>
        doc.id === id ? updatedDocument : doc
      );
      setGlobalDocuments(updatedGlobalDocuments);
    } else {
      alert("データが保存されていません!");
    }
  }, [
    id,
    shapes,
    comment,
    assign,
    status,
    document,
    globalDocuments,
    setGlobalDocuments,
  ]);

  if (!document) {
    return <div>Không tìm thấy tài liệu</div>;
  }

  const handleBackHome = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={`viewer-with-draggable ${document.fileType}`}>
        <aside className="w-1/6 bg-blue-100 p-4 overflow-y-auto space-y-2">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={addNewGroup}
          >
            Add Comment
          </button>
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center border p-2 cursor-pointer bg-gray-100 rounded"
              onClick={() => SelectGroup(group.id)}
            >
              <input
                type="text"
                value={group.text || group.name}
                onChange={(e) => updateGroupText(group.id, e.target.value)}
                className="w-full p-1"
                placeholder="Nhập tên nhóm..."
              />
              <button onClick={() => handleRemoveGroup(group.id)}>Xóa</button>
            </div>
          ))}
        </aside>

        <div className="flex flex-col h-full w-4/6">
          <FileViewer document={document} />
        </div>

        <div className="h-full w-1/6">
          <ShapesEditor
            shapes={selectedGroupShapes}
            setShapes={setShapes}
            groupId={selectedGroupId || ""}
          />

          <Content
            comment={comment}
            assign={assign}
            status={status}
            onChangeAssign={setAssign}
            onChangeStatus={setStatus}
            onChangeComment={setComment}
          />
        </div>
      </div>

      <footer>
        <button className="button-backhome" onClick={handleBackHome}>
          Back
        </button>
        <button className="button-save" onClick={handleSave}>
          Save
        </button>
      </footer>
    </>
  );
};

export default DocumentViewer;
