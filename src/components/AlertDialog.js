import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function AlertDialog(props) {
    const {
        title,
        message,
        isShown,
        closeButtonText = 'Close',
        classes,
        maxWidth = 'md',
    } = props;

    function handleClose() {
        props.onAlertClose();
    }

    return (
        <Dialog
            keepMounted
            open={isShown}
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle
                id="alert-dialog-slide-title"
                disableTypography
            >
                <h2 className={classes.alertTitle}>
                    {title}
                </h2>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {closeButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AlertDialog.propTypes = {
    onAlertClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AlertDialog);
