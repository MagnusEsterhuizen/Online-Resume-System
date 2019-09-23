//react
import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//elements
import DialogButton from "./../../elements/DialogButton/DialogButton";

//styles
/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...(makeStyles(theme => ({
            label: {
                marginTop: theme.spacing(3),
                textAlign: "left"
            },
            labelCaption: {
                ...theme.typography.caption,
                ...{
                    color: theme.palette.secondary.main,
                    borderBottom: "1px dotted"
                },
            },
            menuStyle: {
                backgroundColor: "#f5f5f5",
                margin: 0
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Admin menu for New, Save, View, Edit, Delete, Cancel
 * @param data  - data objects
 * - data[template] - current components template
 * - data[dialogTitle] - delete dialog title
 * - data[dialogSubTitle] - delete dialog sub title
 * - data[dialogText] - delete dialog text
 * @param control   - control functions
 * - control[handleNew] - new button eventhandler
 * - control[handleView] - view button eventhandler
 * - control[handleEdit] - edit button eventhandler
 * - control[handleSave] - save button eventhandler
 * - control[handleRemove] - delete button eventhandler
 * - control[handleCancel] - cancel button eventhandler
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
const AdminMenu = ({ data, control, render, ...props }) => {
    const { template, dialogTitle, dialogSubTitle, dialogText } = data;
    const { handleNew, handleView, handleEdit, handleSave, handleRemove, handleCancel } = control;

    const classes = getClasses();
    return <>
        <menu className={classes.menuStyle} id="AdminMenu">
            <div style={{ textAlign: "right", padding: 16 }}>
                {handleNew && ["list", "view", "edit"].indexOf(template) !== -1
                    ? <Button onClick={handleNew}>New</Button>
                    : <></>
                }
                {handleView && ["list", "edit"].indexOf(template) !== -1
                    ? <Button onClick={handleView}>View</Button>
                    : <></>
                }
                {handleEdit && ["list", "view"].indexOf(template) !== -1
                    ? <Button onClick={handleEdit}>Edit</Button>
                    : <></>
                }
                {handleSave && ["edit"].indexOf(template) !== -1
                    ? <Button onClick={handleSave}>Save</Button>
                    : <></>
                }
                {handleRemove && ["list", "view"].indexOf(template) !== -1
                    ? <DialogButton
                        title={dialogTitle}
                        subTitle={dialogSubTitle}
                        handleOkay={handleRemove}
                        handleCancel={() => true}
                    >Delete</DialogButton>
                    : <></>
                }
                {handleCancel && ["view", "edit"].indexOf(template) !== -1
                    ? <Button onClick={handleCancel}>Cancel</Button>
                    : <></>
                }
            </div>
        </menu >
    </>
}

//container
/**
 * (Container Component) Admin menu for New, Save, View, Edit, Delete, Cancel
 * @param template - list | view | edit
 * @param document - current components document data
 * @param saveDocument - saves the current document
 * @param removeDocument - removes the current document
 * @param newPath - new button navigation path
 * @param viewPath - view button navigation path
 * @param editPath - edit button navigation path
 * @param cancelPath - cancel button navigation path
 * @param history - navigation history
 * @param dialogTitle - delete dialog title
 * @param dialogSubTitle - delete dialog sub title
 * @param dialogText - delete dialog text
 * @param props - props extra
 * @return JSX component
 */
export default ({ template, document, saveDocument, removeDocument, newPath, viewPath, editPath, cancelPath, history, dialogTitle, dialogSubTitle, dialogText, ...props }) => {

    //event handlers
    function handleNew() {
        history.push(newPath);
    }

    function handleView() {
        history.push(viewPath);
    }

    function handleEdit() {
        history.push(editPath);
    }

    function handleSave() {
        if (document) {
            saveDocument(document);
        }
    }

    function handleRemove() {
        if (document && document.id) {
            removeDocument(document);
        }
    }

    function handleCancel() {
        history.push(cancelPath);
    }

    return AdminMenu({
        ...props,
        data: {
            template,
            dialogTitle,
            dialogSubTitle,
            dialogText
        },
        control: {
            handleNew,
            handleView,
            handleEdit,
            handleSave,
            handleRemove,
            handleCancel
        },
        render: {}
    });
}