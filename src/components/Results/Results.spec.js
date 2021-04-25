import { React } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import classes from "./Results.module.scss";
import Results from "./Results";

jest.mock("../../api/request", () => {
  return function (url) {
    console.log(url);
  };
});

describe("Results component", () => {
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

  it("renders results", () => {
    const data = {
      items: [
        {
          id: 1,
          login: "jack",
          type: "user",
          avatar_url: "https://pictures.me/jack.jpeg",
        },
        {
          id: 2,
          login: "jane",
          type: "user",
          avatar_url: "https://pictures.me/jane.jpeg",
        },
        {
          id: 3,
          login: "joe",
          type: "user",
          avatar_url: "https://pictures.me/joe.jpeg",
        },
      ],
      total_count: 100,
      requestParams: { perPage: 20 },
    };
    act(() => {
      render(<Results data={data} />, container);
    });
    expect(container.querySelectorAll("tbody > tr").length).toBe(3);
  });
});
