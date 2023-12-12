import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type FormAssignType = {
  comment: string;
  assign: string;
  status: string;
  onChangeComment: (comment: string) => void;
  onChangeStatus: (status: string) => void;
  onChangeAssign: (assign: string) => void;
  onSave: () => void;
};

const FormAssign = ({
  comment,
  assign,
  status,
  onChangeAssign,
  onChangeStatus,
  onChangeComment,
  onSave,
}: FormAssignType) => {
  return (
    <Card
      sx={{
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 50,
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        p: 2,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "grey.100",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            value={assign}
            onChange={(e) => onChangeAssign(e.target.value)}
            placeholder="Assigner"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => onChangeStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="waiting">Open</MenuItem>
            <MenuItem value="pending">Doing</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="completed">Close</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button size="small">Cancel</Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onSave}
          >
            Save
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default FormAssign;
