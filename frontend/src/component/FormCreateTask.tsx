import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  IconConvert,
  IconUpload,
  RadioClose,
  RadioCompleted,
  RadioDoing,
  RadioOpen,
} from "../icons";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type FormCreateTaskProps = {
  open: boolean;
  onClose: () => void;
};
type Assignee = {
  label: string;
  id: number;
};
const dialogStyles = {
  padding: "20px",
  maxWidth: "550px",
  margin: "auto",
};
const assignees: Assignee[] = [
  { label: "HOANG VAN HIEU", id: 1 },
  { label: "VO NHAT QUANG", id: 2 },
  { label: "LE THE HOA", id: 3 },
  { label: "NGO MINH QUYEN", id: 4 },
  { label: "TRAN QUOC THIEN", id: 5 },
  { label: "LE QUANG HOP", id: 6 },
];

export const FormCreateTask = ({ open, onClose }: FormCreateTaskProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  // const [uploading, setUploading] = useState(false);
  const [assignee, setAssignee] = useState<Assignee | null>(null);
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  // const handleConvertFileUpload = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const formData = new FormData();
  //     formData.append("presentation", file);
  //     setUploading(true);

  //     axios
  //       .post("http://localhost:3001/convert", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         // Xử lý response ở đây
  //         setUploading(false);
  //         alert(
  //           "File converted successfully. Download link: " +
  //             response.data.pdfUrl
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         setUploading(false);
  //       });
  //   } else {
  //     // Xử lý trường hợp không có file nào được chọn
  //     alert("Please select a file to upload.");
  //   }
  // };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        sx={dialogStyles}
      >
        <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />

          <DatePicker
            label="end Date"
            value={null}
            onChange={(newValue: Date | null) => {
              setSelectedDate(newValue);
            }}
            slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
          />

          <Autocomplete
            id="assignee"
            options={assignees}
            getOptionLabel={(option: Assignee) => option.label}
            fullWidth
            autoSelect={false}
            renderInput={(params) => (
              <TextField {...params} label="assignee" margin="normal" />
            )}
            value={assignee}
            onChange={(event: any, newValue: Assignee | null) =>
              setAssignee(newValue)
            }
          />
          <FormControl
            component="fieldset"
            className="flex items-center space-x-2"
          >
            <FormLabel component="legend" className="font-semibold">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="flex space-x-2 "
            >
              <FormControlLabel
                value="open"
                control={<RadioOpen />}
                label="Open"
                className="border p-1 rounded-lg mr-3"
              />
              <FormControlLabel
                value="doing"
                control={<RadioDoing />}
                label="Doing"
                className="border p-1 rounded-lg mr-3"
              />
              <FormControlLabel
                value="completed"
                control={<RadioCompleted />}
                label="Completed"
                className="border p-1 rounded-lg mr-3"
              />
              <FormControlLabel
                value="close"
                control={<RadioClose />}
                label="Close"
                className="border p-1 rounded-lg mr-3"
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className="font-semibold">
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup
              row
              aria-label="priority"
              name="priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="flex space-x-2"
            >
              <FormControlLabel value="high" control={<Radio />} label="High" />
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label="Normal"
              />
              <FormControlLabel value="low" control={<Radio />} label="Low" />
            </RadioGroup>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
            startIcon={<IconUpload />}
            className="w-full justify-start"
          >
            <span className="text-gray-600"> File Upload</span>
         
            <input type="file" hidden />
          </Button>
          <Button
            variant="outlined"
            component="label"
            startIcon={<PictureAsPdf />}
            className="w-full justify-start mt-2"
          >
            <span className="text-gray-600"> Convert File</span>
            {/* <input
              type="file"
              onChange={handleConvertFileUpload}
              accept=".ppt,.pptx,.xlsx,.xls"
              disabled={uploading}
            /> */}
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default FormCreateTask;
