import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "components/LoginForm/LoginForm";
import * as auth from "services/auth";
import { BrowserRouter as Router } from "react-router-dom";

const setupFormInputs = (email: string, password: string): void => {
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: email } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: password } });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));
};

describe("Login From component", () => {
  test("should do login correctly", async () => {
    jest.spyOn(auth, "login");
    render(
      <Router>
        <LoginForm />
      </Router>,
    );

    const email = "test@gmail.com";
    const password = "test";

    setupFormInputs(email, password);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
      expect(auth.login).toHaveBeenCalledTimes(1);
      expect(auth.login).toHaveBeenCalledWith(email, password);
    });
  });

  test("should show invalid email address error message", () => {
    render(
      <Router>
        <LoginForm />
      </Router>,
    );
    const email = "invalid-mail";
    const password = "test";
    const errorMessage = "Invalid email address";

    setupFormInputs(email, password);

    expect(screen.getByTestId("error").textContent).toBe(errorMessage);
  });

  test("should show incorrect credentials error message", async () => {
    jest.spyOn(auth, "login").mockRejectedValue({
      code: "auth/user-not-found",
    });
    render(
      <Router>
        <LoginForm />
      </Router>,
    );
    const email = "test@gmail.com";
    const password = "test";
    const errorMessage = "Incorrect credentials";

    setupFormInputs(email, password);

    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe(errorMessage);
      expect(auth.login).toHaveBeenCalledTimes(1);
      expect(auth.login).toHaveBeenCalledWith(email, password);
    });
  });
});
