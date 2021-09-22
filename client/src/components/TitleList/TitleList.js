import './TitleList.css';
import {useEffect, useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Entry from "./Entry";
import {Col, Row} from "react-bootstrap";

function TitleList({list, updateList, saveList}) {
  const [inputObj, setInputObj] = useState({title: '', id: 0, finished: false})
  const [finsihed, setFinished] = useState(false);
  const [title, setTitle] = useState('');
  const [dragList, updateDragList] = useState([]);
  useEffect(() => {
    updateDragList(list);
  }, [list])
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(dragList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateDragList(items);
  }
  const handleSaveList = (e) => {
    e.preventDefault();
    if(title !== '') {
      inputObj.title = title;
      if(!dragList[0]) {
        inputObj.id = 1;
      } else {
        inputObj.id = Math.max.apply(Math, dragList.map((o) => o.id))+1;
      }
      inputObj.finished = finsihed;
      updateList(inputObj);
      setTitle('');
      setFinished(false);
      setInputObj({title: '', id: 0, finished: false});
    }
  }

  const deleteEntry = (e, entry) => {
    e.preventDefault();
    let deleted = dragList.filter((element) => element.id !== entry.id);
    updateDragList(deleted);
  }
  const editTitle = (e, entry) => {
    e.preventDefault();
    let found = dragList.findIndex((_entry) => _entry.id === entry.id);
    const items = Array.from(dragList);
    items[found] = entry;
    updateDragList(items);
  }

  const observedTitles = (provided, entry, index ) => {
    return <Entry provided={provided} entry={entry} deleteEntry={deleteEntry} index={index} editEntry={editTitle}/>
  }
  return (
    <div className="TitleList">
      <div className={"ListAction"}>
        <input id={"newElement"} placeholder={"Neues Element"} type={"text"} name={"newElement"} value={title} onChange={e => setTitle(e.target.value)}/>
        <button type="submit" value={"add element"} onClick={e => handleSaveList(e)}>Add</button>
        <button type="submit" value={"save list"} onClick={e => saveList(dragList)}>Save List</button>
      </div>
      <Row className={"ListHeading"} >
        <Col className={"col-md"}>
          Title
        </Col>
        <Col className={"col-md"}>
          Finished
        </Col>
        <Col className={"col-md"}>
          Aktion
        </Col>
      </Row>
      <div className={"ListEntrys"}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="entrys">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {dragList.map((entry, index) =>
                  <Draggable key={`${entry.title}-${entry.id}`} draggableId={`${entry.title}-${entry.id}`} index={index}>
                    {(provided) => (
                     observedTitles(provided, entry, index)
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
export default TitleList;
