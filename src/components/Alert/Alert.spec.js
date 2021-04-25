import { React } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import classes from "./Alert.module.scss";
import Alert from "./Alert";

describe("Alert component", () => {
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

  it("renders an alert", () => {
    act(() => {
      render(<Alert status="success" className="my-alert" />, container);
    });
    expect([...container.children[0].classList]).toEqual(
      expect.arrayContaining([
        classes.alert,
        classes["alert--success"],
        "my-alert",
      ])
    );

    act(() => {
      render(
        <Alert>
          <span>Hello</span>
          <span>World</span>
        </Alert>,
        container
      );
    });
    expect(container.children[0].children.length).toBe(2);
    expect(container.children[0].textContent).toBe("HelloWorld");
  });
});
