/* eslint-disable import/no-anonymous-default-export */
import { routes } from "./apiConfig";
import axios from "axios";

const login = async (body) => {
  try {
    const res = await axios.post(routes.LOGIN, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const signup = async (body) => {
  try {
    const res = await axios.post(routes.REGISTER, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const payment = async (body) => {
  try {
    const res = await axios.post(routes.PAYMENT, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const addBoard = async (body) => {
  try {
    const res = await axios.post("/board", body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const editBoard = async (body) => {
  try {
    const res = await axios.patch(`/board/${body.id}`, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const addList = async (body) => {
  try {
    const res = await axios.post("/list", body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const editList = async (body) => {
  try {
    const res = await axios.patch(`/list/${body.id}`, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const addItem = async (body) => {
  const formData = new FormData();

  if (body.cc) formData.append("cc", JSON.stringify(body?.cc ?? null));
  if (body.links) formData.append("links", JSON.stringify(body?.links ?? null));
  formData.append("status", JSON.stringify(body.status));
  formData.append("assignedTo", JSON.stringify(body.assignedTo));
  formData.append("description", body.description);
  formData.append("startDate", new Date(body.startDate));
  formData.append("dueDate", new Date(body.dueDate));
  formData.append("title", body.title);
  formData.append("boardId", body.boardId);
  formData.append("priority", JSON.stringify(body.priority));
  formData.append("documentType", JSON.stringify(body.documentType));
  body?.documents?.map(({ file }) => formData.append("images", file));
  try {
    const res = await axios.post("/item", formData);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const editItem = async (body) => {
  try {
    const res = await axios.patch(`/item/${body.id}`, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const updateProfile = async (body) => {
  const formData = new FormData();
  formData.append("name", body?.name ?? "No-name");
  if (body?.imageUrlLocal) formData.append("imageUrl", body?.imageUrlLocal);
  formData.append("contactNumber", body?.contactNumber ?? "");
  formData.append("companyWebsite", body?.companyWebsite ?? "");
  formData.append("companyName", body?.companyName ?? "");
  try {
    const res = await axios.patch(`/profile`, formData);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const deleteItem = async (id) => {
  try {
    const res = await axios.delete(`/item/${id}`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const getBoardItemsForFilters = async ({
  boardId,
  documentType,
  text,
  status,
}) => {
  try {
    const res = await axios.get(
      `/item/search/filter?documentType=${documentType}&text=${text}&boardId=${boardId}&status=${status}`
    );
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const addMember = async (body) => {
  try {
    const res = await axios.patch(`/board/add/member`, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const deleteBoard = async (id) => {
  try {
    const res = await axios.delete(`/board/${id}`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
const removeMember = async (body) => {
  try {
    const res = await axios.patch(`/board/${body.boardId}/remove/member`, body);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export default {
  login,
  signup,
  payment,
  addBoard,
  editBoard,
  addList,
  editList,
  addItem,
  editItem,
  updateProfile,
  deleteItem,
  getBoardItemsForFilters,
  addMember,
  deleteBoard,
  removeMember,
};
