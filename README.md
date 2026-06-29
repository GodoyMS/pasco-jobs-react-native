# Pasco Jobs - React Native

<div align="center">
  <img src="https://via.placeholder.com/300x600/4285F4/FFFFFF?text=Pasco+Jobs+App" alt="Pasco Jobs Mobile App Preview" />
</div>

## 📱 Overview

**Pasco Jobs** is a job search mobile application built with React Native, designed to help users find employment opportunities on both Android and iOS platforms. The app provides a seamless and intuitive experience for job seekers to browse, search, and apply for jobs.

## ✨ Features

- 🔍 **Job Search** - Browse and search job listings with advanced filters
- 📱 **Cross-Platform** - Native experience on both Android and iOS
- 🔐 **User Authentication** - Secure login and registration
- 💾 **Favorites** - Save job listings for later review
- 📧 **Application Tracking** - Track your job applications
- 🎨 **Modern UI** - Clean and intuitive user interface with React Native Paper
- 📡 **Real-time Data** - GraphQL integration for efficient data fetching
- 💾 **Local Storage** - AsyncStorage for persistent data management
- 🌐 **Web Support** - Bonus web version via Expo

## 🛠 Tech Stack

- **Framework**: React Native (v0.71.8)
- **Runtime**: Expo (~48.0.18)
- **State Management**: Redux Toolkit + Redux Persist
- **API Client**: Apollo Client + Axios
- **UI Components**: React Native Paper, React Native Elements
- **Navigation**: React Navigation
- **Styling**: React Native built-in styling
- **Storage**: AsyncStorage
- **Rich Text**: Pell Rich Editor

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GodoyMS/pasco-jobs-react-native.git
   cd pasco-jobs-react-native
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

**Start the Expo development server:**
```bash
npm start
```

**For Android:**
```bash
npm run android
```

**For iOS:**
```bash
npm run ios
```

**For Web:**
```bash
npm run web
```

## 📁 Project Structure

```
pasco-jobs-react-native/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation configuration
│   ├── redux/            # Redux store, slices, and reducers
│   ├── services/         # API services and GraphQL queries
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles and themes
├── assets/               # Images, fonts, and other assets
├── package.json          # Project dependencies
└── app.json              # Expo configuration
```

## 🔧 Configuration

### Expo Configuration
The project uses Expo for easy development and deployment. Configuration details can be found in `app.json`.

### Environment Variables
Create a `.env` file in the root directory for API endpoints and other configurations:
```env
API_URL=your_api_endpoint
GRAPHQL_URL=your_graphql_endpoint
```

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react-native | 0.71.8 | Core framework |
| expo | ~48.0.18 | Development runtime |
| @reduxjs/toolkit | ^1.9.5 | State management |
| @apollo/client | ^3.7.16 | GraphQL client |
| @react-navigation | ^6.x | Navigation |
| react-native-paper | ^5.8.0 | UI components |
| axios | ^1.4.0 | HTTP client |

## 🎯 Topics

- `job-search` - Core functionality for job search
- `react-native` - Mobile development framework
- `typescript` - Type safety (optional TypeScript support)

## 📊 Repository Stats

- **Language**: JavaScript
- **Created**: July 7, 2023
- **License**: Not specified
- **Visibility**: Public

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with:
- Bug fixes
- New features
- Documentation improvements
- Performance enhancements

## 📝 License

This project is open source and available under the MIT License (or your chosen license).

## 👤 Author

**GodoyMS**
- GitHub: [@GodoyMS](https://github.com/GodoyMS)
- Repository: [pasco-jobs-react-native](https://github.com/GodoyMS/pasco-jobs-react-native)

## 🙋 Support

If you encounter any issues or have questions, please:
1. Check existing [Issues](https://github.com/GodoyMS/pasco-jobs-react-native/issues)
2. Open a new issue with a detailed description
3. Include steps to reproduce and your environment details

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [Apollo Client Docs](https://www.apollographql.com/docs/react)
- [React Navigation Docs](https://reactnavigation.org)

---

**Happy coding! 🚀**
