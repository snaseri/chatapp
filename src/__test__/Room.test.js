import React from "react";
import { render, screen, fireEvent, getByTestId } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Room from "../views/Room";
import { BrowserRouter as Router, Route} from 'react-router-dom'



let container = null;
beforeEach(() => {
    let userList = [];
    const user1 = {
        username: "aName",
        senderId: "1DR4nDom",
        roomId: "room1"

    }
    const user2 = {
        username: "anotherName",
        senderId: "12DR4nDom",
        roomId: "room1"

    }
    userList.push(user1, user2);
    console.log(userList)
});



const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'room1', route)

    return render(ui, { wrapper: Router })
}

test('Testing to see if a user can change their name', () => {
    const route = '/room1'
    renderWithRouter(<Room match={{params: {roomId: "room1"}, isExact: true, path: "/:roomId", url: "/room1"}}/>, { route })


    const leftClick = { button: 0 }
    userEvent.type("Please Enter Your Name", "MyName")

    expect(screen.getByText('You\'re in Room: room1')).toBeInTheDocument()

    expect(screen.getByText('Active Users: (0)')).toBeInTheDocument()

    expect(screen.getByPlaceholderText("Please Enter Your Name")).toBeInTheDocument()

    //Test that the input field for typing in a message appears
    expect(screen.getByPlaceholderText("Send a message...")).toBeInTheDocument()
})


