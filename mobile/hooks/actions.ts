import { useDispatch } from "react-redux";
import { userActions } from "../slices/AuthSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { notificationActions } from "../slices/NotificationSlice";

const actions = {
    ...userActions,
    ...notificationActions,
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};