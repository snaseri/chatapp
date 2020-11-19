import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Room from "../components/Room";
import { BrowserRouter as Router, Route} from 'react-router-dom'
import App from '../App';


const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'room1', route)

    return render(ui, { wrapper: Router })
}

test('Rendering the HTML of the chat room', () => {
    const route = '/room1'
    renderWithRouter(<Room match={{params: {roomId: "room1"}, isExact: true, path: "/:roomId", url: "/room1"}}/>, { route })

   expect(screen.getByText('You\'re in Room: room1')).toBeInTheDocument()
})

