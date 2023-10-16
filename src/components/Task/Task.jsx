import { usePortals } from "react-portal-hook";
import TaskInfo from "../TaskInfo/TaskInfo";
import deleteIcon from "../../img/delete-icon.svg";
import "./style.scss";

const Task = ({ task, tasks, setTasks, handleCheckbox, removeTask }) => {
  const portalManager = usePortals();

  const showTaskInfo = () => {
    portalManager.open(
      portal => <TaskInfo
        closeTaskInfo={portal.close}
        task={task}
        tasks={tasks}
        setTasks={setTasks}
      />
    )
  }

  return (<div className="task-container">
    <input
      className="task-checkbox"
      type="checkbox"
      onChange={() => handleCheckbox(task._id, task.isCheck)}
      checked={task.isCheck}
    />
    
    <button
      className={task.isCheck ? "todo-list__task__checked" : "todo-list__task__unchecked"}
      id={`container-${task._id}`}
      onClick={showTaskInfo}
      disabled={task.isCheck}
    >


    <div className="task-info">
      <h3 className="task-title">{task.title}</h3>
    </div>
    
    </button>
    
    <div className="task-buttons">
      <button
        type="button"
        className="todo-list-button__delete"
        onClick={() => removeTask(task._id)}
        >
        <img src={deleteIcon} alt="" />
      </button>
    </div>
</div>);
};

export default Task;
