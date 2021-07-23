import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "components/SignUpForm/SignUpForm";
import { BrowserRouter as Router } from "react-router-dom";
import * as auth from "services/auth";

const setupFormInputs = (username: string, email: string, password: string): void => {
  fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: username } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: email } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: password } });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));
};

describe("Sign Up From component", () => {
  test("should do sign up correctly", async () => {
    jest.spyOn(auth, "register");
    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    const username = "Test User";
    const email = "test@gmail.com";
    const password = "123123";

    setupFormInputs(username, email, password);

    await waitFor(() => {
      expect(auth.register).toHaveBeenCalledTimes(1);
      expect(auth.register).toHaveBeenCalledWith(email, password, username);
    });
  });

  test("should show invalid email error message", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    const username = "Test User";
    const email = "test-invalid-email";
    const password = "123123";
    const errorMessage = "Invalid email address";

    setupFormInputs(username, email, password);

    expect(screen.getByTestId("error").textContent).toBe(errorMessage);
  });

  test("should show password must have at least 6 characters error message", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    const username = "Test User";
    const email = "test@gmail.com";
    const password = "123";
    const errorMessage = "Password must have at least 6 characters";

    setupFormInputs(username, email, password);

    expect(screen.getByTestId("error").textContent).toBe(errorMessage);
  });
});
