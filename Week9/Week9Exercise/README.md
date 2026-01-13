# Week 9 Exercise - Cheesecake Store App

A React Native mobile application for managing an online cheesecake store. This app allows users to view, search, add, edit, and delete cheesecake items stored in a MySQL database.

## Features

### 1. **View Cheesecakes**
- Displays a list of all cheesecakes from the online database
- Each card shows:
  - Cheesecake image
  - Cheesecake name
  - Calorie count

### 2. **Search Functionality**
- Real-time search filter
- Search by cheesecake name (case-insensitive)
- Instantly filters the list as you type

### 3. **Add New Cheesecakes**
- Navigate to Add screen via "Add Cheesecake" button
- Input fields:
  - **Cheesecake Name** (required)
  - **Image URL** (required)
  - **Calories** (required, numeric)
- Validates all fields before submission
- Automatically returns to home screen after successful addition
- New items appear immediately in the list

### 4. **Edit Existing Cheesecakes**
- Tap any cheesecake card to open the Edit screen
- Pre-filled form with current cheesecake data
- Modify any field (name, image URL, calories)
- **Update** button saves changes to the database
- **Delete** button removes the cheesecake (with confirmation dialog)
- **Cancel** button returns without making changes

## App Structure

### Files

- **App.js** - Main entry point, renders Navigation component
- **Navigation.js** - Navigation container with stack navigator
- **Home.js** - Main screen displaying cheesecake list and search
- **Add.js** - Screen for adding new cheesecakes
- **Edit.js** - Screen for editing or deleting existing cheesecakes

### Navigation Flow

```
App.js
  └── Navigation.js
       ├── Home Screen (default)
       ├── Add Screen
       └── Edit Screen
```

## API Endpoints

The app connects to: `https://onlinecheesecakestore.onrender.com`

### Endpoints Used:

1. **GET** `/allcheesecakes` - Fetch all cheesecakes
2. **POST** `/addcheesecake` - Add a new cheesecake
3. **PUT** `/updatecheesecake/:id` - Update an existing cheesecake
4. **DELETE** `/deletecheesecake/:id` - Delete a cheesecake

### Data Structure

Each cheesecake object contains:
```json
{
  "id": 1,
  "Cheesecake_name": "Classic New York",
  "Cheesecake_calories": "410",
  "Cheesecake_image": "https://example.com/image.jpg"
}
```

## How to Use

### Viewing Cheesecakes
1. Open the app - the home screen displays all cheesecakes
2. Scroll through the list to browse available items
3. The list automatically refreshes when returning from other screens

### Searching for Cheesecakes
1. Type in the search box at the top of the home screen
2. The list filters in real-time as you type
3. Clear the search box to show all items again

### Adding a Cheesecake
1. Tap the "Add Cheesecake" button on the home screen
2. Fill in all three required fields:
   - Cheesecake Name
   - Image URL (full URL to an image)
   - Calories (numbers only)
3. Tap "Add Cheesecake" to submit
4. Or tap "Cancel" to return without adding

### Editing a Cheesecake
1. Tap any cheesecake card on the home screen
2. The Edit screen opens with pre-filled data
3. Modify any fields as needed
4. Tap "Update Cheesecake" to save changes
5. Or tap "Cancel" to return without saving

### Deleting a Cheesecake
1. Tap a cheesecake card to open the Edit screen
2. Tap the "Delete Cheesecake" button
3. Confirm deletion in the popup dialog
4. The cheesecake is permanently removed from the database

## Technical Implementation

### State Management
- Uses React hooks (`useState`, `useEffect`)
- `useFocusEffect` for automatic data refresh when navigating back to Home

### Data Flow
1. Home screen fetches data on load and when focused
2. Original data is cached for search filtering
3. All CRUD operations immediately reflect in the UI
4. Successful operations show success alerts

### Error Handling
- Input validation before submission
- Network error handling with user-friendly alerts
- Response status checking
- Detailed error logging for debugging

### Styling
- Clean, card-based layout
- Responsive design
- Touch-friendly buttons and cards
- Color-coded action buttons (Update, Delete, Cancel)

## Dependencies

- React Native
- @react-navigation/native
- @react-navigation/native-stack
- Fetch API for HTTP requests

## Notes

- The app requires an active internet connection to fetch and update data
- All data is stored in a remote MySQL database
- Changes are permanent and affect all users of the app
- Image URLs must be valid and publicly accessible
