export const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  confirmationDialog: {
    '& .MuiDialogContent-root': {
      padding: 'unset',
    },
  },
  confirmationDialogPad: {
    '& .MuiDialogContent-root': {
      padding: theme.spacing(0),
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
  contentText: {
    padding: theme.spacing(0),
    // fontSize: 18,
    color: 'inherit',
    margin: 0,
  },
});
