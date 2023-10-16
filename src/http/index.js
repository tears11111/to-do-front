import axios from "axios";
import { url } from '../constants';

const $api = axios.create({
    baseURL: url
});

export default $api;