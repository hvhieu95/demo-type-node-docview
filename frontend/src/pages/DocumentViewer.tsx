import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DocumentType } from "../documents";
import { useDocuments } from "../DocumentContext";
import { useNavigate } from "react-router-dom";
import FileViewer from "../component/FileViewer";
import ShapesEditor from "../component/ShapesEditor";
import { v4 as uuidv4 } from "uuid";
import { ShapeType } from "../types/shapetypes";
import { GroupType } from "../types/grouptypes";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Popover from "@mui/material/Popover";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import SupervisedUserCircle from "@mui/icons-material/SupervisedUserCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";
import {
  addGroup,
  removeGroup,
  selectGroup,
  updateGroup,
} from "../actions/groupActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { CreateIcon, IconAvatarAssigner, IconCreateShape } from "../icons";
import FormAssign from "../component/FormAssign";

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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const anchorRef = useRef(null);
  const [newGroupName, setNewGroupName] = useState("");
  const { documents: globalDocuments, setDocuments: setGlobalDocuments } =
    useDocuments();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.textEditor.content);
  const groups = useSelector((state: RootState) => state.group.groups);
  const selectedGroupId = useSelector(
    (state: RootState) => state.group.selectedGroupId
  );

  // hàm mở , đóng Form Task
  const handleOpenPopover = () => {
    setPopoverOpen(true);
  };
  const handleClosePopover = () => {
    setPopoverOpen(false);
  };
  // Hàm thêm một group mới
  const handleCreateNewGroup = () => {
    const newGroupId = uuidv4();
    const newGroup: GroupType = {
      id: newGroupId,
      name: newGroupName,
      shapeIds: [],
    };
    dispatch(addGroup(newGroup));
    setNewGroupName("");
    setPopoverOpen(false);
  };
  // Hàm chọn một group
  const HandleSelectGroup = (groupId: string) => {
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
  // hàm sửa text
  const handleTextChange = (newContent: string) => {
    if (selectedGroupId) {
      dispatch(updateGroup(selectedGroupId, newContent));
    }
  };
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
        <aside className="flex items-center  w-1/6 bg-blue-100 p-4 overflow-y-auto space-y-2 flex-col">
          <Button
            ref={anchorRef}
            variant="contained"
            color="primary"
            onClick={handleOpenPopover}
          >
            <CreateIcon />
            Create Task
          </Button>
          <Popover
            open={popoverOpen}
            anchorEl={anchorRef.current}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Task"
                type="text"
                fullWidth
                variant="outlined"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopover} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateNewGroup} color="primary">
                Create
              </Button>
            </DialogActions>
          </Popover>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {groups.map((group) => (
              <ListItem
                className="border-b border-gray-200"
                key={group.id}
                alignItems="flex-start"
                onClick={() => HandleSelectGroup(group.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <IconAvatarAssigner />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`Today ${new Date().toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                      </Typography>
                    </React.Fragment>
                  }
                  primary={
                    <input
                      type="text"
                      value={group.name}
                      onChange={(e) =>
                        updateGroupText(group.id, e.target.value)
                      }
                      className="border-none w-full focus:ring-0"
                      placeholder="..."
                      style={{ fontSize: "24px" }}
                    />
                  }
                />
                <IconButton>
                  <IconCreateShape />
                </IconButton>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveGroup(group.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </aside>

        <div className="flex flex-col h-full w-4/6">
          <FileViewer document={document} />
        </div>

        <div className="flex h-full w-1/6">
          <ShapesEditor
            shapes={selectedGroupShapes}
            setShapes={setShapes}
            groupId={selectedGroupId || ""}
          />
          {/* 
          {selectedGroupId && (
            <div className="fixed w-full bottom-20 ">
              <RichTextEditor
                text={content}
                onTextChange={handleTextChange}
                placeholder="..."
              />
            </div>
          )} */}
        </div>
      </div>
      <FormAssign
        comment={comment}
        assign={assign}
        status={status}
        onChangeAssign={setAssign}
        onChangeStatus={setStatus}
        onChangeComment={setComment}
      />
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
