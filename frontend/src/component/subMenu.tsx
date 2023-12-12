import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  IconTask,
  IconVersion,
  RadioClose,
  RadioCompleted,
  RadioDoing,
  RadioOpen,
} from "../icons";
import Box from "@mui/material/Box";

interface Version {
  name: string;
  status: "completed" | "doing" | "open" | "close";
  avatar?: string;
  description?: string;
}

interface Task {
  name: string;
  status: "completed" | "doing" | "open" | "close";
  description?: string;
}

// Mock data for versions and tasks
const versions: Version[] = [
  {
    name: "Fix A-006",
    status: "completed",
    avatar: "/path/to/avatar.jpg", // replace with actual image path
    description: "#Fix a-006-01, #Fix a-006-02",
  },
  {
    name: "Fix A-006",
    status: "completed",
    avatar: "/path/to/avatar.jpg", // replace with actual image path
    description: "#Fix a-006-01, #Fix a-006-02",
  },
  {
    name: "Fix A-006",
    status: "completed",
    avatar: "/path/to/avatar.jpg", // replace with actual image path
    description: "#Fix a-006-01, #Fix a-006-02",
  },
  {
    name: "Fix A-006",
    status: "completed",
    avatar: "/path/to/avatar.jpg", // replace with actual image path
    description: "#Fix a-006-01, #Fix a-006-02",
  },
];

const tasks: Task[] = [
  {
    name: "R-005",
    status: "doing",
    description: "You should delete this text",
  },
  {
    name: "R-004",
    status: "close",
    description: "You should delete this text",
  },
  {
    name: "R-003",
    status: "open",
    description: "You should delete this text",
  },
  {
    name: "R-002",
    status: "completed",
    description: "You should delete this text",
  },
  {
    name: "R-001",
    status: "completed",
    description: "You should delete this text",
  },
];

export const SubMenu = () => {
  const [openVersions, setOpenVersions] = useState(true);
  const [openTasks, setOpenTasks] = useState(true);

  const handleExpandVersions = () => {
    setOpenVersions(!openVersions);
  };

  const handleExpandTasks = () => {
    setOpenTasks(!openTasks);
  };
  // Hàm render icon với màu sắc dựa trên trạng thái
  const renderStatusIcon = (
    status: "completed" | "doing" | "open" | "close"
  ) => {
    const colorClass = getStatusColor(status); // Hàm này sẽ trả về tên class màu sắc
    switch (status) {
      case "completed":
        return <RadioCompleted className={colorClass} />;
      case "doing":
        return <RadioDoing className={colorClass} />;
      case "close":
        return <RadioClose className={colorClass} />;
      case "open":
        return <RadioOpen className={colorClass} />;
      default:
        return null;
    }
  };

  // Hàm lấy màu cho icon và text dựa trên trạng thái
  const getStatusColor = (status: "completed" | "doing" | "open" | "close") => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "doing":
        return "text-blue-500";
      case "close":
        return "text-red-500";
      case "open":
        return "text-gray-500";
      default:
        return "";
    }
  };

  return (
    <div className=" sticky left-0 top-0  h-screen flex  overflow-y-hiden bg-blue-100 p-3">
      <List component="nav" className="divide-y">
        <ListItem button onClick={handleExpandVersions} className="gap-2">
          <IconVersion />
          <ListItemText primary="Versions" />
          {openVersions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={openVersions} timeout="auto" unmountOnExit>
          {versions.map((version, index) => (
            <ListItem
              key={index}
              className="flex items-center pl-4 border-b border-gray-200 last:border-b-0 "
            >
              <Avatar
                src={version.avatar}
                className="mr-4"
                alt={version.name}
              />
              <ListItemText
                primary={version.name}
                secondary={version.description}
                primaryTypographyProps={{ className: "font-semibold" }}
                secondaryTypographyProps={{
                  className: "text-xs text-gray-500",
                }}
                className="!min-w-0 !flex-1"
              />
            </ListItem>
          ))}
        </Collapse>

        <ListItem button onClick={handleExpandTasks} className="gap-2">
          <IconTask />
          <ListItemText primary="Tasks" />
          {openTasks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={openTasks} timeout="auto" unmountOnExit>
          {tasks.map((task, index) => (
            <ListItem
              button
              key={index}
              sx={{
                display: "flex",
                justifyContent: "between",
                alignItems: "center",
                p: 2,
                mb: 1,
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "common.white",
                },
                border: 1,
                borderColor: "primary.light",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <ListItemText
                primary={task.name}
                secondary={task.description}
                primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
                secondaryTypographyProps={{
                  sx: { fontSize: "0.875rem", color: "text.secondary" },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                {renderStatusIcon(task.status)}
                <Box>
                  <span className={`ml-2 ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </Box>
              </Box>
            </ListItem>
          ))}
        </Collapse>
      </List>
    </div>
  );
};

export default SubMenu;
