import { React } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import classes from "./Button.module.scss";
import Button from "./Button";

describe("Button component", () => {
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

  it("renders a button", () => {
    act(() => {
      render(
        <Button small className="my-btn">
          <span>Hello</span>
          <span>World</span>
        </Button>,
        container
      );
    });
    expect([...container.children[0].classList]).toEqual(
      expect.arrayContaining([classes.btn, classes["btn--small"], "my-btn"])
    );
    expect(container.children[0].textContent).toBe("HelloWorld");
    expect(container.children[0].children.length).toBe(2);

    act(() => {
      render(<Button loading></Button>, container);
    });
    expect(container.children[0].children[0].tagName).toBe("svg");
    expect([...container.children[0].children[0].classList]).toEqual(
      expect.arrayContaining(["loading"])
    );
  });
});
