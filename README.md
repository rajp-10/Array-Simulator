# Array Operations Simulator

## Project Objective
The **Array Operations Simulator** is an interactive, purely client-side web application designed to help Computer Science students and learners visualize, understand, and interact with fundamental array data structures and operations in real-time. It acts as an educational learning lab emphasizing clean design and dynamic algorithmic feedback.

## Features
- **1D & 2D Address Calculation**: Compute memory addresses of array elements instantly.
- **Array Insertion**: Visually demonstrates how elements shift right to make room for new elements.
- **Array Deletion**: Demonstrates left-shifting of elements to fill memory gaps after deletion.
- **Linear Search**: Animated step-by-step search demonstrating sequential O(n) checking.
- **Binary Search**: Interactive binary splitting visualizer for sorted arrays.
- **Learning Mode**: A mini-textbook explaining theoretical concepts.
- **Fully Responsive**: Beautiful, minimal, and clear UX on mobile and desktop.
- **Light Theme**: Calm sky blue and white professional academic design.

## Algorithms Used
1. Address Calculation (Row-Major Order for 2D)
2. Right-shift insertion
3. Left-shift deletion
4. Sequential Linear Search
5. Divide-and-Conquer Binary Search

## Technology Used
- React 18
- TypeScript / JavaScript
- Tailwind CSS (v3)
- Framer Motion (for smooth micro-animations)
- Lucide Icons (optional)
- Vite (Build Tool)

## How to Run Locally
1. Ensure you have Node.js installed.
2. Clone this repository or download the source code.
3. Open a terminal in the project directory.
4. Run `npm install` to install dependencies.
5. Run `npm run dev` to start the development server.
6. Open the provided `localhost` URL in your browser.

## How to Build
To create a production-ready optimized build:
```bash
npm run build
```
The output will be placed in the `dist` directory.

## How to Deploy on Netlify
1. Create a GitHub repository and push your code.
2. Go to [Netlify](https://www.netlify.com/) and click "Add new site" -> "Import an existing project".
3. Connect your GitHub account and select your repository.
4. Set the Build Command to `npm run build`.
5. Set the Publish directory to `dist`.
6. Click **Deploy Site**.

## How to Deploy on GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add a `homepage` property to your `package.json`: `"homepage": "https://<username>.github.io/<repo-name>"`
3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run deploy`.

## Screenshots
*(Add screenshots here after capturing the running application)*
- Homepage & Address Calculation
- Binary Search Step-by-Step
- Array Shifting (Insertion)

## Future Scope
- Implementation of Column-Major 2D address calculation.
- Support for customizable themes (while maintaining professional look).
- Support for visual sorting algorithms (Bubble, Merge, Quick).
- Export calculation steps to PDF.
