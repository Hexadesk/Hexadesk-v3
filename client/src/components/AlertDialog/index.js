import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

function AlertDialog(props) {
  const {
    classes,
    open = false,
    showTitle,
    title,
    message,
    cancelButtonText,
    applyButtonText,
    cancelAlertDialog,
    applyAlertDialog,
    maxWidth,
    customClass,
    hideApplyButton,
    hideCancelButton,
    disableBackdropClick,
    isFullScreen,
    goBackHandler,
    noPadding,
    cancelButtonColor = "primary",
    disabledAction = false,
    hideActions = false,
  } = props;

  return (
    <>
      <Dialog
        open={open ?? false}
        keepMounted
        fullScreen={!!isFullScreen}
        disableBackdropClick={disableBackdropClick || false}
        onClose={cancelAlertDialog || goBackHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth={maxWidth}
        fullWidth={true}
        PaperProps={{
          square: true,
          elevation: 24,
        }}
        className={`${
          noPadding ? classes.confirmationDialog : classes.confirmationDialogPad
        } ${!!customClass ? customClass : ""}`}
        //scroll='body'
      >
        {showTitle ? (
          isFullScreen ? (
            <MuiDialogTitle disableTypography className={classes.root}>
              {!!goBackHandler && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={goBackHandler}
                  aria-label="close"
                >
                  <ArrowBackIosIcon />
                </IconButton>
              )}
              <Typography variant="h6"> {title}</Typography>
            </MuiDialogTitle>
          ) : (
            <MuiDialogTitle disableTypography className={classes.root}>
              <Typography variant="h6"> {title}</Typography>
            </MuiDialogTitle>
          )
        ) : (
          <span />
        )}
        <DialogContent id={"dialogcontent"} style={{ minHeight: 82 }}>
          <Grid container xs={12} justify={"center"}>
            <Grid xs={12}>
              <DialogContentText
                id={"dialogcontenttext"}
                component={"div"}
                className={classes.contentText}
              >
                {message}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        {!!hideActions && hideActions
          ? ""
          : (cancelButtonText || applyButtonText) && (
              <DialogActions>
                {!!cancelButtonText && !hideCancelButton && (
                  <Button
                    onClick={cancelAlertDialog}
                    color={cancelButtonColor || "secondary"}
                    variant={"outlined"}
                    disabled={disabledAction}
                  >
                    {cancelButtonText}
                  </Button>
                )}
                {!!applyButtonText && !hideApplyButton && (
                  <Button
                    onClick={applyAlertDialog}
                    color={props.applyButtonColor || "primary"}
                    variant={"contained"}
                    styles={{ fontFamily: "inherit" }}
                    type={"submit"}
                    disabled={disabledAction}
                  >
                    {applyButtonText}
                  </Button>
                )}
              </DialogActions>
            )}
      </Dialog>
    </>
  );
}

export default withStyles(styles)(AlertDialog);
