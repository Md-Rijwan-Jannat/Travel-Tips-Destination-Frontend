// notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMessage } from '@/src/types';
import { RootState } from '../../store';

interface NotificationState {
  notifications: TMessage[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<TMessage>) {
      state.notifications.push(action.payload);
    },
    clearNotifications(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.chat._id !== action.payload
      );
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export const getNotifications = (state: RootState) =>
  state.notifications.notifications;
export default notificationSlice.reducer;
