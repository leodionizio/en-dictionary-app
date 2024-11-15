import { render, screen, waitFor } from "@testing-library/react";
import DictionaryPage from "../../app/dictionary/page";
import { useDictionary } from "../../app/hooks/dictionary";
import { useHistory } from "../../app/hooks/history";
import { useFavorites } from "../../app/hooks/favorites";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("../../app/hooks/dictionary", () => ({
  useDictionary: jest.fn(),
}));

jest.mock("../../app/hooks/history", () => ({
  useHistory: jest.fn(),
}));

jest.mock("../../app/hooks/favorites", () => ({
  useFavorites: jest.fn(),
  isFavoriteWord: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DictionaryPage", () => {
  const mockGetWords = jest.fn();
  const mockGetHistory = jest.fn();
  const mockGetFavoritesWords = jest.fn();
  const mockIsFavoriteWord = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    localStorage.setItem("accessToken", "mocked-access-token");

    (useDictionary as jest.Mock).mockReturnValue({
      getWords: mockGetWords,
      words: ["apple", "banana", "cherry"],
      loading: false,
    });
    (useHistory as jest.Mock).mockReturnValue({
      getHistory: mockGetHistory,
      uniqueHistory: [
        { word: "coconut", date: "2024-11-01" },
        { word: "join", date: "2024-11-02" },
      ],
    });
    (useFavorites as jest.Mock).mockReturnValue({
      getFavoritesWords: mockGetFavoritesWords,
      isFavoriteWord: mockIsFavoriteWord,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should render the dictionary page correctly", () => {
    render(<DictionaryPage />);

    expect(screen.getByText("Select an recent word")).toBeInTheDocument();
    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("banana")).toBeInTheDocument();
    expect(screen.getByText("cherry")).toBeInTheDocument();
    expect(screen.getAllByText("Show details").length).toBe(3);
  });

  it("should call redirectToWordDetails when a word is selected from the Autocomplete", async () => {
    render(<DictionaryPage />);

    await userEvent.click(screen.getByLabelText("Select an recent word"));
    await userEvent.click(screen.getByText("coconut"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dictionary/coconut/details");
    });
  });

  it("should call redirectToWordDetails when 'Show details' button is clicked", async () => {
    render(<DictionaryPage />);

    await userEvent.click(screen.getAllByText("Show details")[0]);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dictionary/apple/details");
    });
  });

  it("should render a spinner when loading is true", () => {
    (useDictionary as jest.Mock).mockReturnValue({
      getWords: mockGetWords,
      words: [],
      loading: true,
    });

    render(<DictionaryPage />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });
});
