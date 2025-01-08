I apologize for the oversight. Here is the complete Markdown code for your README file:

````markdown
# React Native Profile App

This is a React Native project designed for a user profile page, integrating various components like a top bar, middle bar with favorite items, and a navigation bar. The application allows users to manage their profiles, view their activities, and easily navigate between different sections.

## Features

- **Profile Top Bar**: Displays user information and profile picture.
- **Profile Middle Bar**: Shows a list of user-related actions (e.g., favorite restaurants, bookings).
- **Navigation Bar**: Provides easy navigation between various sections of the app (Home, Restaurant, Search, Profile, Product).
- **Dynamic UI**: Supports dark mode and light mode based on the system preferences.
- **Notification Bar**: Displays a list of notifications with expandable descriptions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project-name.git
   ```
````

2. Navigate into the project directory:

   ```bash
   cd your-project-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or if you're using Yarn:

   ```bash
   yarn install
   ```

4. Run the app:

   ```bash
   npx react-native run-android   # For Android
   npx react-native run-ios       # For iOS
   ```

## Components

### 1. ProfileTopBar

The profile top bar contains the user's name, email, and profile picture. It also includes a "View Activity" link that redirects the user to their activity page.

### 2. ProfileMiddleBar

The middle bar contains a list of user actions, such as viewing favorite restaurants, bookings, history, and more. The actions are represented with icons and titles, and each item navigates to a different page when pressed.

### 3. NavigationBar

A bottom navigation bar allows users to switch between different app sections like Home, Restaurant, Search, Profile, and Product. It dynamically changes color based on the selected tab and theme (dark or light mode).

### 4. BackButton

The back button provides a way to navigate back to the previous screen. It uses the Ionicons library to display a back arrow.

### 5. NotificationBar

This component displays a list of notifications. Each notification can be expanded or collapsed by tapping on it. The notifications contain a title, description, and timestamp.

## Theme Support

The app supports both light and dark themes, automatically switching between them based on the system's theme preference.

- **Dark Mode**: Dark background with light text and icons.
- **Light Mode**: Light background with dark text and icons.

## Technologies Used

- **React Native**: For building the mobile application.
- **Expo**: For easier development, providing access to native APIs and libraries.
- **Ionicons**: For using icons throughout the app.
- **React Navigation**: For navigation management.
- **React Context/State**: For managing theme and user state.

## Contributing

If you'd like to contribute to this project, feel free to fork it and submit a pull request. Any suggestions or improvements are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```

Feel free to copy and paste this into your `README.md` file! Let me know if there are any other adjustments or additions you'd like.
```
