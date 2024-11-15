// __tests__/FavoriteButton.test.tsx
import { useFavorites } from "../../hooks/favorites";
import { render, screen, waitFor } from "@testing-library/react";
import { FavoriteButton } from "../favorite-button";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/favorites");

describe("FavoriteButton", () => {
  it("should render the button with the correct icon when the word is not favorite", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      addWordToFavorites: jest.fn(),
      removeWordFromFavorites: jest.fn(),
      isFavoriteWord: jest.fn().mockReturnValue(false),
      loading: false,
    });

    render(<FavoriteButton word="test" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByLabelText("Favorite")).toContainHTML(
      '<svg xmlns="http://www.w3.org/2000/svg"'
    );
  });

  it("should call addWordToFavorites when clicked and word is not favorite", async () => {
    const addWordToFavoritesMock = jest.fn();
    const removeWordFromFavoritesMock = jest.fn();
    (useFavorites as jest.Mock).mockReturnValue({
      addWordToFavorites: addWordToFavoritesMock,
      removeWordFromFavorites: removeWordFromFavoritesMock,
      isFavoriteWord: jest.fn().mockReturnValue(false),
      loading: false,
    });

    render(<FavoriteButton word="test" />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(addWordToFavoritesMock).toHaveBeenCalledWith("test")
    );
  });

  it("should call removeWordFromFavorites when clicked and word is already favorite", async () => {
    const addWordToFavoritesMock = jest.fn();
    const removeWordFromFavoritesMock = jest.fn();
    (useFavorites as jest.Mock).mockReturnValue({
      addWordToFavorites: addWordToFavoritesMock,
      removeWordFromFavorites: removeWordFromFavoritesMock,
      isFavoriteWord: jest.fn().mockReturnValue(true),
      loading: false,
    });

    render(<FavoriteButton word="test" />);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(removeWordFromFavoritesMock).toHaveBeenCalledWith("test")
    );
  });
});
