import { render, screen, waitFor } from "@testing-library/react";
import SigninPage from "../../app/signin/page";
import { useAuth } from "../../app/hooks/auth";
import { useRouter } from "next/navigation";
// import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

jest.mock("../../app/hooks/auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SigninPage", () => {
  const mockSignin = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signin: mockSignin,
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should render the signin page correctly", () => {
    render(<SigninPage />);

    expect(screen.getByText(/English Dictionary/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Signin")).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
    expect(screen.getByText(/Signup here/i)).toBeInTheDocument();
  });

  it("should fill the form and call signin function", async () => {
    render(<SigninPage />);

    await userEvent.type(
      screen.getByPlaceholderText("E-mail"),
      "test@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "password123"
    );

    await userEvent.click(screen.getByText("Signin"));

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it('should navigate to signup page when "Signup here" is clicked', async () => {
    render(<SigninPage />);

    await userEvent.click(screen.getByText("Signup here"));
    expect(mockPush).toHaveBeenCalledWith("/signup");
  });
});
