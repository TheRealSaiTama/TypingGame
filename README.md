# Speed Typer 💨⌨️

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <br>
  <img src="https://img.shields.io/badge/Status-Complete-green" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0-blue" alt="Version" />
</div>

<p align="center">A sleek, interactive typing speed test application to measure and improve your typing skills</p>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Implementation](#technical-implementation)
  - [HTML Structure](#html-structure)
  - [CSS Styling](#css-styling)
  - [JavaScript Functionality](#javascript-functionality)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## 🔍 Overview

**Speed Typer** is a modern web application designed to test and improve your typing speed and accuracy. The app provides real-time feedback on your typing performance, including words per minute (WPM), characters per minute (CPM), and accuracy metrics, all wrapped in a clean and responsive UI.

## ✨ Features

- **Multiple Difficulty Levels**: Choose between Easy (60s), Medium (30s), or Hard (15s) challenges
- **Real-time Statistics**: Monitor your WPM, CPM, mistakes, and time remaining as you type
- **Detailed Results**: Get comprehensive feedback on your performance after each test
- **Random Text Selection**: Practice with a variety of paragraphs to ensure diverse typing experiences
- **Visual Feedback**: Color-coded characters indicate correct/incorrect typing in real-time
- **Sound Effects**: Audible feedback for keystrokes, errors, and test completion
- **Motivational Quotes**: Receive encouraging messages based on your performance
- **Persistent Settings**: Your difficulty preference is saved between sessions
- **Responsive Design**: Fully functional on all device sizes

## 🛠️ Technical Implementation

### HTML Structure

The `index.html` file establishes a clean, semantic structure for the application with three main sections:

1. **Settings Screen**:

   - Difficulty selection buttons
   - Instructions panel
   - Start button to begin the test

2. **Game Area**:

   - Input field for typing (hidden but focused)
   - Text display area with the paragraph to type
   - Real-time statistics panel (time, mistakes, WPM, CPM)
   - Retry button

3. **Results Screen**:
   - Comprehensive stats display (speed, accuracy, character count, errors)
   - Motivational quote based on performance
   - Options to try again or start a new test

The HTML utilizes Font Awesome icons to enhance visual appeal and user experience throughout the interface.

### CSS Styling

The `style.css` file implements a modern, clean design with:

- **CSS Variables**: Custom properties for consistent color theming and easy modification
- **Responsive Layout**: Flexbox and CSS Grid for optimal display across all device sizes
- **Visual Feedback**: Distinct styling for correct, incorrect, and active characters
- **Micro-interactions**: Hover and active states for interactive elements
- **Card-based Design**: Clean, shadow-based components for visual separation
- **Performance Optimizations**: Efficient selectors and minimal nesting for optimal rendering

The styling creates a distraction-free environment that allows users to focus on the typing challenge while providing clear visual cues about their performance.

### JavaScript Functionality

The `script.js` file powers the application logic with several key components:

- **Game State Management**: Tracking typing progress, timer, mistakes, and statistics
- **Dynamic Text Generation**: Random paragraph selection and character-by-character rendering
- **Real-time Validation**: Character-by-character comparison as the user types
- **Statistics Calculation**: WPM, CPM, and accuracy algorithms
- **Local Storage Integration**: Saving user preferences and performance history
- **Event Handling**: Keyboard input processing and UI interaction management
- **Audio Feedback**: Sound effects for typing, errors, and test completion
- **Adaptive Experience**: Different motivational quotes based on performance level

The code is organized into focused functions with clear responsibilities, making it maintainable and extensible.

## 🎮 How to Play

1. Select your preferred difficulty level (Easy, Medium, or Hard)
2. Click "Start Typing Test" to begin
3. Type the displayed text as quickly and accurately as possible
4. View your real-time statistics as you type
5. When time runs out or you complete the text, review your detailed results
6. Choose to try again with the same settings or return to the settings screen

## 📦 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/TheRealSaiTama/TypingGame.git
   ```

2. Open the project folder:

   ```bash
   cd TypingGame
   ```

3. Open `index.html` in your browser or use a local development server.

No build process or dependencies required! The application runs entirely in the browser.

## 🚀 Future Enhancements

- **User Accounts**: Save progress and compete with friends
- **Custom Text Input**: Allow users to paste their own text for practice
- **Theme Options**: Light/dark mode and custom color schemes
- **Advanced Statistics**: Historical performance tracking and improvement graphs
- **Multiplayer Mode**: Race against other typists in real-time
- **Keyboard Layout Options**: Support for different keyboard layouts

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Created with ❤️ by TheRealSaitama</p>
  <p>👨‍💻 Happy Typing! 👩‍💻</p>
</div>
