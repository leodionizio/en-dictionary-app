import { render, screen, waitFor } from "@testing-library/react";
import SignupPage from "../../app/signup/page";
import { useAuth } from "../../app/hooks/auth";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("../../app/hooks/auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignupPage", () => {
  const mockSignup = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should render the signup page correctly", () => {
    render(<SignupPage />);

    expect(screen.getByText(/Create new account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fullname")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
    expect(screen.getByText(/Signin here/i)).toBeInTheDocument();
  });

  it("should fill the form and call signup function", async () => {
    render(<SignupPage />);

    await userEvent.type(screen.getByPlaceholderText("Fullname"), "John Doe");
    await userEvent.type(
      screen.getByPlaceholderText("E-mail"),
      "john@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "password123"
    );

    await userEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
    });
  });

  it('should navigate to signin page when "Signin here" is clicked', async () => {
    render(<SignupPage />);

    await userEvent.click(screen.getByText("Signin here"));
    expect(mockPush).toHaveBeenCalledWith("/signin");
  });
});
