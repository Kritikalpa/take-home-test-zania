# Take Home Assignment

This assignment contains a grid of 2 x 3 containing cat images and title. The images can be reordered by drag and drop. The images also opens as an overlay on click.

## To run the application

- Clone the repository.
- Install the packages.
- Run `npm run dev`

### Part 1: Front End

- The static json file is served from the public folder and fetched using the fetch API. The data is stored in a state inside the `CatGrid` component that handles and updates the states on reordering and triggering overlay. The position of the data is kept static across updates to correctly map the cat images with the changing object data, and changing the index of the stored data to rendered as per the order after reordering. It contains the handler functions for the `CatGridItem` component's mouse events, like `onDragStart`, `onDragEnd`. Each of these components are made draggable.

- The overlay is created by maintaining a state that stores both open condition and current index of the overlay image to be displayed. 

- Loaders are provided for the loading images and are hidden when `onLoad` event is triggered.

### Part 2: Making the call

- Added a local service that mocks a server to send responses. It intercepts the request using service worker and returns a mock HttpResponse object. Handlers are added in the `handler.ts` file under `src/mocks` folder

- It saves and fetch the data to the browser local storage.

### Part 3: Tying it up!

- Added a save loader that checks for any changes every 5 seconds in the data before saving it to the browser local storage. In section, the save function that was called on every action is removed.

- It lists the last saved time.

## Technical Specs

- React
- TypeScript
- Vite
- Mock Server : https://github.com/mswjs/msw (REST API)

## Architectural Decisions

### Component Structure:

- `CatGrid`: This is the main component that fetches data, manages state, and contains the grid of draggable cat images.
- `CatGridItem`: Represents each individual item in the grid, handling drag-and-drop events (onDragStart, onDragEnd, etc.). It also triggers the overlay display when an image is clicked
- `Overlay`: This component is responsible for displaying the selected image.

### State Management:

- The application uses React's state to store cat data, manage the order of items, and control the overlay display.
- It also uses browser local storage to store and retrieve data using mock api endpoints.
- Drag-and-drop interactions update the order of cat data in the state. The image is set on the basis of the initial data index in the JSON object.
- Overlay state is toggled based on user interactions. It stores an index of the current image.

### Data Fetching and Mock Server:

- Data is initially fetched from a static JSON file located in the public folder using the Fetch API.
- A local mock server using mswjs (Mock Service Worker) intercepts fetch requests to simulate server responses.
- Handlers defined in handler.ts mock typical server operations like GET, POSTrequests, simulating responses to fetch and save operations.

### Drag and Drop Implementation:

- Drag-and-drop functionality is implemented using native HTML drag events.
- Event handlers (onDragStart, onDragEnd) update the state to reflect the new order.

### Local Storage Persistence:

- Changes in the state are periodically saved to local storage every 5 seconds.
- The application checks for updates before saving, avoiding redundant save operations and improving performance.