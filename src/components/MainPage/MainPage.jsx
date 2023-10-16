import { useState, useEffect } from 'react';
import AddTaskField from '../AddTaskField/AddTaskField';
import Task from '../Task/Task';
import { getTasks, addTask,  changeCheckbox, deleteTask } from '../../service/TaskService';
import { sortByDateAndIsCheck } from '../../service/helpers';
import './style.scss';

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [singleTask, setSingleTask] = useState({
    title: '',
    text: '',
    isCheck: false
  });

  const getAllTasks = async () => {
    try {
      const resp = await getTasks();
      if (resp.statusText === 'OK') {
        setTasks(sortByDateAndIsCheck(resp.data));
      }
    } catch (error) {
      setError('unable to get all tasks');
    }
  };

  const addNewTask = async () => {
    try {
      const resp = await addTask(singleTask);
      if (resp.statusText === 'OK' && singleTask.title !== '') {
        setTasks(sortByDateAndIsCheck([...tasks, resp.data]));
        setSingleTask({
          title: '',
          text: '',
          isCheck: false
        });
        setError('');
      }
    } catch (error) {
      setError('unable to add task');
    }
  };

  const handleCheckbox = async (id, check) => {
    try {
      const resp = await changeCheckbox(id, check);
      if (resp.statusText === 'OK') {
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]._id === id) {
            tasks[i].isCheck = resp.data.isCheck;
            break;
          }
        }
        setTasks(sortByDateAndIsCheck([...tasks]));
        setError('');
      }
    } catch (error) {
      setError('unable to change checkbox');
    }
  };

  const removeTask = async (id) => {
    try {
      const resp = await deleteTask(id);
      if (resp.statusText === 'OK') {
        setTasks(tasks.filter((task) => task._id !== id));
        setError('');
      }
    } catch (error) {
      setError('unable to delete task');
    }
  };

  const handleChange = (key, value) => {
    setSingleTask({ ...singleTask, [key]: value});
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <AddTaskField
        error={error}
        addNewTask={addNewTask}
        singleTask={singleTask}
        setSingleTask={setSingleTask}
        handleChange={handleChange}
      />

      <div className="todo-list__content-page">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            handleCheckbox={handleCheckbox}
            removeTask={removeTask}
          />
        ))}
      </div>
    </>
  );
};

export default MainPage;
