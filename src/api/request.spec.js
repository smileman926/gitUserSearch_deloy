import { act } from "react-dom/test-utils";
import request from "./request";

describe("request function", () => {
  it("should call api and return results", async () => {
    const users = [{ username: "johndoe" }, { username: "janedoe" }];

    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(users),
      });
    });

    expect(
      request({
        searchTerm: "jack",
        perPage: 10,
        page: 2,
        sort: "followers",
      })
    ).resolves.toEqual(users);

    // check fetch url
    const url = fetch.mock.calls[0][0];
    expect(url).toContain("q=jack");
    expect(url).toContain("per_page=10");
    expect(url).toContain("page=2");
    expect(url).toContain("sort=followers");

    fetch.mockRestore();
  });

  it("should reject promise if status is not 200", async () => {
    const users = [{ username: "johndoe" }, { username: "janedoe" }];

    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ message: "error" }),
      });
    });

    expect(
      request({
        searchTerm: "jack",
        perPage: 10,
        page: 2,
        sort: "followers",
      })
    ).rejects.toThrow(new Error("error"));

    fetch.mockRestore();
  });
});
