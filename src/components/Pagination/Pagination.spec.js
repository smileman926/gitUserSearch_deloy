import { React } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import classes from "./Pagination.module.scss";
import Pagination from "./Pagination";

describe("Pagination component", () => {
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

  it("renders an pagination component", () => {
    const onChange = jest.fn();

    act(() => {
      render(
        <Pagination items={[4, 5, 6, 7, 8]} active={6} onChange={onChange} />,
        container
      );
    });

    const items = container.querySelectorAll(`.${classes.item}`);
    expect(items).toHaveLength(5);

    // check active item position
    const activeIdx = [...items].findIndex((item) =>
      [...item.classList].includes(classes["item--active"])
    );
    expect(activeIdx).toBe(2);

    act(() => {
      items[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toBeCalledWith(4);
  });
});
