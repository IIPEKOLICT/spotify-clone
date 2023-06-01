import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VoidCallback } from '@yumasoft-spotify/socket-sdk';

interface SocketHookInstanceData {
  interceptors: {
    onDestroy?: VoidCallback[];
  };
}

interface SocketState {
  hookInstances: Record<string, SocketHookInstanceData>;
}

interface IdPayload {
  id: number;
}

interface InterceptorPayload extends IdPayload {
  onDestroy?: VoidCallback;
}

interface BooleanPayload extends IdPayload {
  onDestroy?: boolean;
}

const initialState: SocketState = {
  hookInstances: {},
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    newSocketHookInstance(state, action: PayloadAction<IdPayload>) {
      state.hookInstances[action.payload.id.toString()] = {
        interceptors: {
          onDestroy: [],
        },
      };
    },
    addSocketInterceptor(state, action: PayloadAction<InterceptorPayload>) {
      const idKey: string = action.payload.id.toString();

      state.hookInstances[idKey] = {
        interceptors: {
          ...state.hookInstances[idKey].interceptors,
          ...Object.keys(action.payload).reduce((acc: SocketHookInstanceData['interceptors'], key: string) => {
            if (key === 'id' || !action.payload[key]) {
              return acc;
            }

            acc[key] = [...(state.hookInstances[idKey].interceptors[key] ?? []), action.payload[key]];
            return acc;
          }, {}),
        },
      };
    },
    executeSocketEventInterceptors(state, action: PayloadAction<BooleanPayload>) {
      const idKey: string = action.payload.id.toString();

      Object.keys(action.payload).forEach((key: string) => {
        if (key !== 'id' && action.payload[key]) {
          (state.hookInstances[idKey].interceptors[key] ?? []).forEach((interceptor: VoidCallback) => {
            interceptor();
          });
        }
      });
    },
    clearSocketEventInterceptors(state, action: PayloadAction<BooleanPayload>) {
      const idKey: string = action.payload.id.toString();

      state.hookInstances[idKey] = {
        interceptors: {
          ...state.hookInstances[idKey].interceptors,
          ...Object.keys(action.payload).reduce((acc: SocketHookInstanceData['interceptors'], key: string) => {
            if (key !== 'id' && action.payload[key]) {
              acc[key] = [];
            }

            return acc;
          }, {}),
        },
      };
    },
  },
});

export const socketName = socketSlice.name;

export const socketActions = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
