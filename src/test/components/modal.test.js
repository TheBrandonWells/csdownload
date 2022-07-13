import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../components/modal";

const data = [
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
];

describe("Downloads Modal - Functionality", () => {
  test("renders the modal header", () => {
    render(<Modal list={data} />);
    const headerElement = screen.getByText(/Downloads/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the device from the downloads list provided in props", () => {
    render(<Modal list={data} />);
    const deviceElement = screen.getByText(/Targaryen/i);
    expect(deviceElement).toBeInTheDocument();
  });
});
