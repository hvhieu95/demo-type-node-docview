import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DocumentType } from "../documents";
import { useDocuments } from "../DocumentContext";
import { useNavigate } from "react-router-dom";
import FileViewer from "../component/FileViewer";
import CreateaSubTask from "../component/CreateaSubTask";
import { addShape } from "../actions/shapeActions";
import { v4 as uuidv4 } from "uuid";
import { ShapeType } from "../types/shapetypes";
import { GroupType } from "../types/grouptypes";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Popover from "@mui/material/Popover";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  WidthFull,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Box,
  Collapse,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

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
import SubMenu from "../component/subMenu";
import SearchBar from "../component/searchBar";
import { RootStateTask } from "../store";




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
  const [openMainTasks, setOpenMainTasks] = useState(true);
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
  const fileUrl = useSelector((state: RootStateTask) => state.tasks.currentFileUrl);


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
  // hàm tạo thẻ con từ thẻ cha
  const handleAddShape = (shapeType: "rectangle") => {
    const newShapeId = uuidv4();
    const newShape = {
      id: newShapeId,
      groupId: selectedGroupId, // Đảm bảo shape được thêm vào nhóm đúng
      type: shapeType,
      position: { x: 0, y: 0 },
      size: { width: 150, height: 100 },
      text: "",
    };

    dispatch(addShape(newShape));
  };

  // hàm mở rộng xem list Task

  const handleExpandMainTasks = () => {
    setOpenMainTasks(!openMainTasks);
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
        <div className="w-1/6">
          <SubMenu />
        </div>

        <div className="w-5/6 flex flex-col">
          <div className="sticky top-0 z-10">
            <SearchBar />
          </div>

          <div className="flex flex-col  p-4">
            <div className="border w-4/5 flex flex-col h-full ">
              <FileViewer document={document}   />
            </div>
            <aside className="flex-none fixed  right-0  flex items-center  w-1/6 h-screen bg-blue-100 p-4 overflow-y-auto space-y-2 flex-col">
              <Button
                ref={anchorRef}
                variant="contained"
                color="primary"
                onClick={handleOpenPopover}
                className="w-full justify-start"
              >
                <CreateIcon />
                Create Comment
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Ngăn chặn trình duyệt tự động submit form
                    handleCreateNewGroup(); // Gọi hàm tạo group mới
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
                    <Button
                      onClick={handleCreateNewGroup}
                      variant="contained"
                      color="primary"
                    >
                      Create
                    </Button>
                  </DialogActions>
                </form>
              </Popover>

              <ListItem
                button
                onClick={handleExpandMainTasks}
                className="gap-2"
              >
                <ListItemText primary="List" />
                {openMainTasks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={openMainTasks} timeout="auto" unmountOnExit>
                <List sx={{ width: "100%" }}>
                  {groups.map((group) => (
                    <Box
                      key={group.id}
                      onClick={() => HandleSelectGroup(group.id)}
                  
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        p: 2,
                        border: "1px solid transparent",
                        bgcolor: "white",
                        '&:hover': {
                          borderColor: "blue", 
                        },
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <IconAvatarAssigner />
                          </Avatar>
                        </ListItemAvatar>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ flexGrow: 1 }}
                        >
                          {`Today ${new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                        </Typography>
                        <IconButton onClick={() => handleAddShape("rectangle")}>
                          <IconCreateShape />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveGroup(group.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <TextField
                        value={group.name}
                        onChange={(e) =>
                          updateGroupText(group.id, e.target.value)
                        }
                        size="small"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter task..."
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "transparent", // Hide border when not focused
                            },
                            "&:hover fieldset": {
                              borderColor: "transparent", // Hide border on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.main", // Show border when focused
                            },
                          },
                        }}
                      />
                    </Box>
                  ))}
                </List>
              </Collapse>

              <FormAssign
                comment={comment}
                assign={assign}
                status={status}
                onChangeAssign={setAssign}
                onChangeStatus={setStatus}
                onChangeComment={setComment}
                onSave={handleSave}
              />
            </aside>
          </div>
        </div>
        <CreateaSubTask
          shapes={selectedGroupShapes}
          setShapes={setShapes}
          groupId={selectedGroupId || ""}
          onAddShape={handleAddShape}
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
      {/* 
      <footer>
        <button className="button-backhome" onClick={handleBackHome}>
          Back
        </button>
      </footer> */}
    </>
  );
};

export default DocumentViewer;
