import { render, screen, fireEvent } from "@testing-library/react";
import DownloadList from "../../components/downloadList";
import data from "../../services/index.json";

describe("Downloads List - Initial setup", () => {
  test("renders the header", () => {
    render(<DownloadList data={data} />);
    const selectionElement = screen.getByText(/None Selected/i);
    const downloadLink = screen.getByTestId("downloadLink");
    expect(selectionElement).toBeInTheDocument();
    expect(downloadLink).toBeInTheDocument();
  });

  test("renders the table", () => {
    render(<DownloadList data={data} />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});

describe("Downloads List - Select all functionality", () => {
  test("clicking the select all button updates our label", () => {
    render(<DownloadList data={data} />);
    const button = screen.getByTestId("selectAll");

    fireEvent.click(button);
    expect(screen.getByText("Selected 2")).toBeInTheDocument();
  });

  test("clicking the select all button checks our checkboxes that are in the available state", () => {
    render(<DownloadList data={data} />);
    const selectAllButton = screen.getByTestId("selectAll");
    const netshCheckbox = screen.getByTestId("item1");
    const uxthemeCheckbox = screen.getByTestId("item2");

    expect(netshCheckbox).not.toBeChecked();
    expect(uxthemeCheckbox).not.toBeChecked();
    fireEvent.click(selectAllButton);
    expect(netshCheckbox).toBeChecked();
    expect(uxthemeCheckbox).toBeChecked();
  });

  test("selecting one checkbox from the list changes the selectAll button to indeterminate", () => {
    render(<DownloadList data={data} />);
    const listItem1 = screen.getByTestId("item1");

    fireEvent.click(listItem1);
    expect(screen.getByTestId("selectAll")).toHaveProperty(
      "indeterminate",
      true
    );
  });
});

describe("Downloads List - Download Button functionality", () => {
  test("the download button is disabled before selections are made", () => {
    render(<DownloadList data={data} />);
    const downloadLink = screen.getByTestId("downloadLink");
    expect(downloadLink).toHaveAttribute("disabled");
  });
  test("selecting a checkbox from the list enables the download button", () => {
    render(<DownloadList data={data} />);
    const listItem1 = screen.getByTestId("item1");

    fireEvent.click(listItem1);
    expect(screen.getByTestId("downloadLink")).not.toBeDisabled();
  });

  test("clicking download button will open modal window", () => {
    render(<DownloadList data={data} />);
    const listItem1 = screen.getByTestId("item1");
    const downloadLink = screen.getByTestId("downloadLink");

    fireEvent.click(listItem1);
    expect(downloadLink).not.toBeDisabled();

    fireEvent.click(downloadLink);
    expect(screen.getByText("Downloads")).toBeInTheDocument();
  });
});

describe("Downloads List - Modal functionality", () => {
  test("clicking the close button on modal will close it", () => {
    render(<DownloadList data={data} />);
    const listItem1 = screen.getByTestId("item1");
    const downloadLink = screen.getByTestId("downloadLink");

    fireEvent.click(listItem1);
    expect(downloadLink).not.toBeDisabled();

    fireEvent.click(downloadLink);
    expect(screen.getByText("Downloads")).toBeInTheDocument();

    const modalCloseButton = screen.getByTestId("modalClose");

    fireEvent.click(modalCloseButton);
    expect(screen.queryByText("Downloads")).not.toBeInTheDocument();
  });
});
