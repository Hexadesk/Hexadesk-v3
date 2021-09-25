import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { List, ListItem, ListItemText } from '@material-ui/core';

export const KanBadModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        className='kanbad-modal-overlay'
        onClick={handleClickOpen}
      ></Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogContent dividers>
          <List component='nav' aria-label='secondary mailbox folder'>
            <ListItem
              className='border-bottom'
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText className='my-0' primary='Edit Title' />
            </ListItem>
            <ListItem
              className='border-bottom'
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemText className='my-0' primary='Modify Members' />
            </ListItem>
            <ListItem
              className='border-bottom'
              button
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemText className='my-0' primary='Duplicate' />
            </ListItem>
            <ListItem
              className='border-bottom'
              button
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemText className='my-0' primary='Change Due Date' />
            </ListItem>
            <ListItem
              className='border-bottom'
              button
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemText className='my-0' primary='Move to Trash' />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};
