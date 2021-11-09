import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import AuthContext from '../auth'

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);
  const { auth } = useContext(AuthContext);
  
  if (auth.errorStatus){
    return (
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    // authReducer({
                    //     type: AuthActionType.UPDATE_ERROR_STATUS,
                    //     payload: {
                    //         errorMessage: null,
                    //         errorStatus: false
                    //     }
                    // })
                    // auth.turnOffErrorStatus()
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {auth.errorMessage}
            </Alert>
          </Collapse>
        </Box>
      );
  } else {
      return null;
  }
  
}