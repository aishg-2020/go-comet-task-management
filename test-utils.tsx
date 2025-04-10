import { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import taskReducer from "@/store/taskSlice";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export function renderWithRedux(ui: ReactNode) {
  return render(<Provider store={store}>{ui}</Provider>);
}
