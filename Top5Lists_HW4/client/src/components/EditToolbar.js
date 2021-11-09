import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    let undoButtonClass = "top5-button-disabled";
    let redoButtonClass = "top5-button-disabled";
    let closeButtonClass = "top5-button-disabled";

    // let editStatus = false;
    // if (store.isListNameEditActive) {
    //     editStatus = true;
    // } 
    if (store.currentList != null){
        closeButtonClass = "top5-button";
        if (store.hasUndo){
            undoButtonClass = "top5-button";
        } else {
            undoButtonClass = "top5-button-disabled";
        }

        if (store.hasRedo){
            redoButtonClass = "top5-button";
        } else {
            redoButtonClass = "top5-button-disabled";
        }
    }
    if (store.isItemEditActive){
        return (
            <div id="edit-toolbar">
                <Button 
                    id='undo-button'
                    // onClick={handleUndo}
                    variant="contained"
                    className="top5-button-disabled">
                        <UndoIcon />
                </Button>
                <Button 
                    id='redo-button'
                    // onClick={handleRedo}
                    variant="contained"
                    className="top5-button-disabled">
                        <RedoIcon />
                </Button>
                <Button 
                    id='close-button'
                    // onClick={handleClose}
                    variant="contained"
                    className="top5-button-disabled">
                        <CloseIcon />
                </Button>
            </div>
        )
    } else {
        return (
            <div id="edit-toolbar">
                <Button 
                    id='undo-button'
                    onClick={handleUndo}
                    variant="contained"
                    className={undoButtonClass}>
                        <UndoIcon />
                </Button>
                <Button 
                    id='redo-button'
                    onClick={handleRedo}
                    variant="contained"
                    className={redoButtonClass}>
                        <RedoIcon />
                </Button>
                <Button 
                    id='close-button'
                    onClick={handleClose}
                    variant="contained"
                    className={closeButtonClass}>
                        <CloseIcon />
                </Button>
            </div>
        )
    }
}

export default EditToolbar;