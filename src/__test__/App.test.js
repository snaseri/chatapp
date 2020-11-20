import { render, screen } from '@testing-library/react';
import App from '../App';
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Room from "../components/Room";
import RoomSelection from "../components/RoomSelection";


// test("Home page renders correctly - HTML Test", () => {
//   const history = createMemoryHistory();
//   render(
//       <Router history={history}>
//         <App />
//       </Router>,
//   );
//   //Test that the app has the correct path
//   expect(history.location.pathname).toBe("/");
//
//   //Test that the input field for selecting a room appears
//   expect(screen.getByPlaceholderText("Enter the Chat Room You Would Like To Enter")).toBeInTheDocument()
//
//   //Test that the join button appears
//   expect(screen.getByText("Join this chat room")).toBeInTheDocument()
//
// });