import { useState } from "react";
import { confirmTaskEditing } from "../../service/TaskService";
import { sortByDateAndIsCheck } from "../../service/helpers";
import close from "../../img/close.svg";
import edit from "../../img/edit.svg";
import done from "../../img/done.svg";
import "./style.scss";

const TaskInfo = ({ closeTaskInfo, task, tasks, setTasks }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [singleTask, setSingleTask] = useState(task);

  const editTaskInfo = () => {
    setIsEdit(true);
  }

  const confirmEdit = async () => {
    console.log(singleTask);
    const resp = await confirmTaskEditing(singleTask, singleTask._id);
    if (resp.statusText === 'OK') {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]._id === singleTask._id) {
          tasks[i].title = resp.data.title;
          tasks[i].text = resp.data.text;
          break;
        }
      }
      setTasks(sortByDateAndIsCheck([...tasks]))
      closeTaskInfo();
      setIsEdit(false);
    }
    
  }

  const handleChange = (key, value) => {
    setSingleTask({ ...singleTask, [key]: value});
  }

  return (<>
  <div className="task-info-page">
    {isEdit ?
      <div className="task-info-container__done">
        <div className="task-info__actions">
          <button
            className="done-info"
            type="button"
            onClick={confirmEdit}
          >
            <img src={done} alt="" />
          </button>

          <input 
            className="task-info-title__done"
            maxLength="15"
            value={singleTask.title}
            onChange={(event) => handleChange('title', event.target.value)}
          />

          <button
            className="close-info"
            type="button"
            onClick={closeTaskInfo}
          >
            <img src={close} className="close-info__icon" />
          </button>
        </div>
        <div className="task-description">
          <textarea 
            className="task-info-text__done"
            cols="24" 
            rows="8"
            value={singleTask.text}
            onChange={(event) => handleChange('text', event.target.value)}
          >
          </textarea>
        </div>
      </div> : 

      <div className="task-info-container__edit">
        <div className="task-info__actions">
        <button
          className="edit-info"
          type="button"
          onClick={editTaskInfo}
        >
          <img src={edit} alt="" />
        </button>
          

          <h3 className="task-info-title__edit">{singleTask.title}</h3>

          <button
            className="close-info"
            type="button"
            onClick={closeTaskInfo}
          >
            <img src={close} className="close-info__icon" />
          </button>
        </div>
        <div className="task-description">
          <textarea 
            className="task-info-text__edit"
            cols="24" 
            rows="8"
            value={singleTask.text}
            readOnly
          >
          </textarea>
        </div>
      </div>
    }
    </div>
 </>)
}

export default TaskInfo;
