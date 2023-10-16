import $api from "../http/index";
import { url } from "../constants";

export const getTasks = async () => await $api.get('/tasks');

export const addTask = async (task) => await $api.post('/tasks', task);

export const deleteTask = async (id) => await $api.delete(`tasks/${id}`);

export const changeCheckbox = async (_id, check) => await $api.patch(`tasks/${_id}/checkbox`, { isCheck: !check });

export const confirmTaskEditing = async (task, id) => await $api.patch(`tasks/${id}`, task);