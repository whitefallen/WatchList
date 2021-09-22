import {useState} from "react";
import { MdClear, MdCheck} from "react-icons/md";
import {Col, Row} from "react-bootstrap";

function Entry({provided, entry, deleteEntry, index, editEntry}) {
  const [newTitle, setNewTitle] = useState(entry.title);
  const [newId, setNewId] = useState(entry.id);
  const [newStatus, setNewStatus] = useState(entry.finished);
  const [editMode, setEditMode] = useState(false);
  const [oldValues] = useState({title: entry.title, id: entry.id, finished: entry.finished})
  const toggleEditMode = () => {
    setEditMode(!editMode);
  }
  const cancelMode = () => {
    setNewTitle(oldValues.title);
    setNewId(oldValues.id);
    setNewStatus(oldValues.finished);
    setEditMode(!editMode);
  }
  const saveEdit = (e, entry) => {
    entry.title = newTitle;
    entry.id = newId;
    entry.finished = newStatus;
    editEntry(e,entry)
    setEditMode(!editMode);
  }
  return (
    <Row ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={"row"}>
      {editMode
        ? <>
        <Col className={"col"}>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)}/>
        </Col>
        <Col className={"col"}>
          <input type={"checkbox"} checked={newStatus} value={newStatus} onChange={e => setNewStatus(e.target.checked)}/>
        </Col>
        <Col className={"col"}>
          <button type={"button"} onClick={e => cancelMode(e, entry)}>Cancel</button>
          <button type={"button"} onClick={e => saveEdit(e, entry)}>Ok</button>
        </Col>
      </>
        : <>
          <Col className={"col"}>
            {newTitle}
          </Col>
          <Col className={"col"}>
            {newStatus ?<MdCheck/>:<MdClear/>}
          </Col>
          <Col className={"col"}>
            <button type={"button"} onClick={e => deleteEntry(e, entry)}>Delete</button>
            <button type={"button"} onClick={toggleEditMode}>Edit</button>
          </Col>
        </>
      }
    </Row>
  );
}

export default Entry;
