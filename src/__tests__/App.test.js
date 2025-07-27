import React from "react";
import "whatwg-fetch";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

// Mock server lifecycle
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("sanity check", () => {
  expect(true).toBe(true);
});

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  await screen.findByText(/lorem testum 1/);

  fireEvent.change(screen.getByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer \(Form\)/), {
    target: { value: "1" },
  });

  fireEvent.click(screen.getByText(/Submit Question/));
  fireEvent.click(screen.getByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  await screen.findByText(/lorem testum 1/);
  fireEvent.click(screen.getAllByText("Delete Question")[0]);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/lorem testum 1/)
  );

  expect(screen.queryByText(/lorem testum 1/)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  await screen.findByText(/lorem testum 2/);

  const dropdown = screen.getAllByLabelText(/Correct Answer/)[1];
  fireEvent.change(dropdown, { target: { value: "3" } });

  await waitFor(() => {
    expect(dropdown.value).toBe("3");
  });
});
