import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserList from "components/User/UserList";
import * as user from "services/user";
import { BrowserRouter as Router } from "react-router-dom";

describe("User List component", () => {
  test("should list users correctly", async () => {
    jest.spyOn(user, "default").mockReturnValue(Promise.resolve([{ username: "test", email: "test@gmail.com" }]));
    render(
      <Router>
        <UserList />
      </Router>,
    );

    await waitFor(() => {
      const listItem = screen.getAllByRole("listitem");
      expect(listItem).toHaveLength(1);
      expect(user.default).toHaveBeenCalledTimes(1);
      expect(user.default).toHaveBeenCalledWith("");
    });
  });

  test("should show an error message if an exception ocurred", async () => {
    const errorMessage = /something went wrong/i;
    jest.spyOn(user, "default").mockRejectedValue(() => Promise.reject());

    render(
      <Router>
        <UserList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage).textContent).toBe("Something went wrong, try again later");
      expect(user.default).toHaveBeenCalledTimes(1);
      expect(user.default).toHaveBeenCalledWith("");
    });
  });

  test("should filter users correctly", async () => {
    const users = [
      {
        email: "test@gmail.com",
        username: "test",
      },
    ];
    jest
      .spyOn(user, "default")
      .mockImplementation((search: string) =>
        Promise.resolve(users.filter((u) => u.username.includes(search) || u.email.includes(search))),
      );

    render(
      <Router>
        <UserList />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search people.../i), { target: { value: "test" } });

    await waitFor(() => {
      const listItem = screen.getAllByRole("listitem");
      expect(listItem).toHaveLength(1);
      expect(user.default).toHaveBeenCalledTimes(1);
      expect(user.default).toHaveBeenCalledWith("test");
    });
  });

  test("should show a message that no users were found when filtering", async () => {
    const users = [
      {
        email: "test@gmail.com",
        username: "test",
      },
    ];
    const noUsersMessage = /could not find users/i;
    jest
      .spyOn(user, "default")
      .mockImplementation((search: string) =>
        Promise.resolve(users.filter((u) => u.username.includes(search) || u.email.includes(search))),
      );

    render(
      <Router>
        <UserList />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search people.../i), { target: { value: "invalid" } });

    await waitFor(() => {
      const listItem = screen.queryAllByRole("listitem");
      expect(listItem).toHaveLength(0);
      expect(screen.getByText(noUsersMessage).textContent).toContain("Could not find users with this criteria");
      expect(user.default).toHaveBeenCalledTimes(1);
      expect(user.default).toHaveBeenCalledWith("invalid");
    });
  });
});
