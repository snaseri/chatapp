import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Room from "../components/Room";

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
        // render(<Room roomId={2}/>, container);
    });
    // expect(container.textContent).toBe("Active Users");

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
