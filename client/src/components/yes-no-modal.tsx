import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

export interface YesNoModalProps {
  open: boolean;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
  title?: string;
  content?: string;
}

export default function YesNoModal({
  open,
  onClose,
  onYes,
  onNo,
  title,
  content
}: YesNoModalProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {content && (
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            )}
            <DialogActions>
            <Button onClick={onNo} color="primary">
                No
            </Button>
            <Button onClick={onYes} color="primary" autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    );
};