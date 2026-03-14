import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

export interface UloadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
};

export default function UploadModal({ open, onClose, onUpload }: UloadModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      onClose();
      setFile(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" component="label">
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <TextField
          label="Selected file"
          value={file?.name ?? ''}
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!file}
          color="primary"
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};