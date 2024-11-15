import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { BackButton } from "../back-button";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  it("should render the back button", () => {
    const routerMock = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);

    render(<BackButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should call router.back() when clicked", async () => {
    const routerMock = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);

    render(<BackButton />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(routerMock.back).toHaveBeenCalled();
  });
});
