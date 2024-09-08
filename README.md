# Built using React + TypeScript + Vite

This assignment contains a grid of 2 x 3 containing cat images and title. The images can be reordered by drag and drop. The images also opens as an overlay on click.

## To run the application

- Clone the repository.
- Install the packages.
- Run `npm run dev`

### Part 1: Front End

- The static json file is served from the public folder and fetched using the fetch API. The data is stored in a state inside the `CatGrid` component that handles and updates the states on reordering and triggering overlay. The position of the data is kept static across updates to correctly map the cat images with the changing object data, and changing the index of the stored data to rendered as per the order after reordering. It contains the handler functions for the `CatGridItem` component's mouse events, like `onDragStart`, `onDragEnd`. Each of these components are made draggable.

- The overlay is created by maintaining a state that stores both open condition and current index of the overlay image to be displayed. 

- Loaders are provided for the loading images and are hidden when `onLoad` event is triggered.