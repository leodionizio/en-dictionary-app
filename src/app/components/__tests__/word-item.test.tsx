import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { WordItem } from "../word-item";
import { FavoriteButton } from "../../components/favorite-button";
import { WordAdded } from "../../types/dictionary";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../components/favorite-button", () => ({
  FavoriteButton: jest.fn(() => <button>Favorite</button>),
}));

describe("WordItem", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render the word and date", () => {
    const summaryWord: WordAdded = { word: "example", date: "2024-11-15" };

    render(<WordItem summaryWord={summaryWord} />);

    expect(screen.getByText("example")).toBeInTheDocument();
    expect(screen.getByText("Added at: 2024-11-15")).toBeInTheDocument();
  });

  it("should render the favorite button", () => {
    const summaryWord: WordAdded = { word: "example", date: "2024-11-15" };

    render(<WordItem summaryWord={summaryWord} />);

    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });

  it('should navigate to word details when "Show details" button is clicked', async () => {
    const summaryWord = { word: "example", date: "2024-11-15" };

    render(<WordItem summaryWord={summaryWord} />);

    await userEvent.click(
      screen.getByRole("button", { name: /Show details/i })
    );

    expect(mockPush).toHaveBeenCalledWith("/dictionary/example/details");
  });

  it("should call favorite button when clicked", async () => {
    const addWordToFavoritesMock = jest.fn();

    (FavoriteButton as jest.Mock).mockImplementation(({ word }: any) => (
      <button onClick={() => addWordToFavoritesMock(word)}>Favorite</button>
    ));

    const summaryWord = { word: "example", date: "2024-11-15" };

    render(<WordItem summaryWord={summaryWord} />);

    await userEvent.click(screen.getByText("Favorite"));

    expect(addWordToFavoritesMock).toHaveBeenCalledWith("example");
  });
});
