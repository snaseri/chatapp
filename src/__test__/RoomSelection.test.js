import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
import Room from "../components/Room";
import RoomSelection from "../components/RoomSelection";


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders active users", () => {
    act(() => {
        // render(<RoomSelection/>, container);
    });
//     expect(container.textContent).toBe("Join This ChatRoom");

    // act(() => {
    //     render(<Room name="Jenny" />, container);
    // });
    // expect(container.textContent).toBe("Hello, Jenny!");
    //
    // act(() => {
    //     render(<Room name="Margaret" />, container);
    // });
    // expect(container.textContent).toBe("Hello, Margaret!");
});
