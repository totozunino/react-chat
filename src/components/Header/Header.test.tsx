import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "components/Header/Header";
import * as auth from "services/auth";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header component", () => {
  test("should do logout correctly", async () => {
    jest.spyOn(auth, "logout");

    render(
      <Router>
        <Header />
      </Router>,
    );

    fireEvent.click(screen.getByTestId("logout"));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });
});
