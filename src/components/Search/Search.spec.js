import { React } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import Search from "./Search";

// mock request
jest.mock("../../api/request", () => jest.fn());
import request from "../../api/request";

describe("Search component", () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.useRealTimers();
  });

  it("renders a search element", async () => {
    const onDataLoad = jest.fn();
    request.mockResolvedValue({ items: "array" });

    act(() => {
      render(<Search onDataLoad={onDataLoad} />, container);
    });
    expect(container.querySelector("input")).not.toBeNull();

    act(() => {
      const input = container.querySelector("input");
      input.value = "search";
      Simulate.change(input);
    });

    await act(async () => {
      const input = container.querySelector("input");
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
    });

    // check request function call
    expect(request).toBeCalledWith(
      expect.objectContaining({ searchTerm: "search" })
    );

    // check onDataLoad call
    act(() => {
      jest.runAllTimers();
    });

    expect(onDataLoad).toBeCalledWith(
      expect.objectContaining({
        items: "array",
        requestParams: expect.objectContaining({ searchTerm: "search" }),
      })
    );
  });
});
