// import { useContext } from 'react'
// import { GlobalStoreContext } from '../store'
// /*
//     This modal is shown when the user asks to delete a list. Note 
//     that before this is shown a list has to be marked for deletion,
//     which means its id has to be known so that we can retrieve its
//     information and display its name in this modal. If the user presses
//     confirm, it will be deleted.
    
//     @author McKilla Gorilla
// */
// function DeleteModal() {
//     const { store } = useContext(GlobalStoreContext);
//     let name = "";
//     if (store.listMarkedForDeletion) {
//         name = store.listMarkedForDeletion.name;
//     }
//     function handleDeleteList(event) {
//         store.deleteMarkedList();
//     }
//     function handleCloseModal(event) {
//         store.hideDeleteListModal();
//     }
//     return (
//         <div
//             className="modal"
//             id="delete-modal"
//             data-animation="fadeInUp">
//             <div className="modal-dialog">
//                 <header className="dialog-header">
//                     Delete the {name} Top 5 List?
//                 </header>
//                 <div id="confirm-cancel-container">
//                     <button
//                         id="dialog-yes-button"
//                         className="modal-button"
//                         onClick={handleDeleteList}
//                     >Confirm</button>
//                     <button
//                         id="dialog-no-button"
//                         className="modal-button"
//                         onClick={handleCloseModal}
//                     >Cancel</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DeleteModal;

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

export default function DeleteModal() {
//   const [open, setOpen] = React.useState(false);
  const { store } = useContext(GlobalStoreContext);
  let name = "";
  if (store.listMarkedForDeletion) {
    name = store.listMarkedForDeletion.name;
  }
  function handleDeleteList(event) {
    store.deleteMarkedList();
  }
  function handleCloseModal(event) {
    store.hideDeleteListModal();
  }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div id="delete-modal">
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={store.listMarkedForDeletion}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Top 5 " + name + " List?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is permanent and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleDeleteList} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}