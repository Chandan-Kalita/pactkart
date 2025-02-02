# PactKart

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone git@github.com:Chandan-Kalita/pactkart.git
   ```
2. Navigate to the project directory:
   ```sh
   cd pactkart
   ```
3. Install dependencies:
   ```sh
   yarn
   ```
4. Start the development server:
   ```sh
   yarn run dev
   ```

## Available Scripts

- **`yarn run dev`** - Starts the Next.js development server.
- **`yarn run build`** - Builds the project for production.
- **`yarn run start`** - Starts the production server.
- **`yarn run lint`** - Runs ESLint to check code quality.

## Architecture Decisions

- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Code Quality**: TypeScript and ESLint

## Trade-offs Made

- Chose Redux Toolkit for state management due to its efficiency and ease of use.
- Used Tailwind CSS for styling to maintain a consistent and scalable design system.
- Ensured code quality by adopting TypeScript and ESLint.

## Limitations

- Due to the fake API data source, some calculations had to be performed on the client side, including:
  - Search suggestions
  - Cart total
  - Cart item details
  - Similar products
- Sorting options could not be implemented due to API limitations.
- The chosen API resets periodically, causing some items to be deleted. As a result:
  - When a user adds an item to the cart and it gets deleted, the item details must be fetched from the API again.
  - Cart items cannot be stored locally.

## Future Improvements

- Improve the UI to enhance user experience.

