# FSD Viva Voce Answer Guide

This document contains the detailed answers and explanations for the **Viva Prep** topics listed in your `README.md`. Use this as your primary study material to confidently answer questions from your examiners.

---

## Phase 1: Static Web Structure and Styling (HTML5 & CSS3)

### 1. HTML Tags
**Q: What is the difference between semantic and non-semantic tags? Why do semantics matter?**
**Answer:** Non-semantic tags (like `<div>` and `<span>`) tell us nothing about their content. Semantic tags (like `<header>`, `<article>`, `<footer>`, `<nav>`) clearly describe their meaning to both the browser and the developer. 
Semantics matter for two main reasons:
1.  **SEO (Search Engine Optimization):** Search engine bots use semantic tags to understand the context of the page, helping it rank better.
2.  **Accessibility:** Screen readers rely on semantic tags to navigate the page and read content aloud properly for visually impaired users.

### 2. Student Profile
**Q: Explain the CSS Box Model.**
**Answer:** The CSS Box Model is a box that wraps around every HTML element. It consists of four parts, from inside out:
1.  **Content:** The actual content of the box, where text and images appear.
2.  **Padding:** Clears an area around the content. The padding is transparent.
3.  **Border:** A border that goes around the padding and content.
4.  **Margin:** Clears an area outside the border. The margin is transparent and separates the element from other elements.

### 3. Restaurant Menu
**Q: How do you construct an HTML table? Why shouldn't you use tables for page layout?**
**Answer:** A table is constructed using `<table>`, containing table rows `<tr>`, which contain table headers `<th>` or table data cells `<td>`.
You should **never** use tables for page layout because tables are meant strictly for displaying tabular data. Using them for layout is bad for accessibility (screen readers get confused) and makes responsive design incredibly difficult compared to modern CSS tools like Flexbox or Grid.

### 4. Static Web Page Elements
**Q: What are the different `<input>` types? What is the difference between GET and POST in form submissions?**
**Answer:** Common input types include `text`, `password`, `email`, `number`, `radio`, `checkbox`, and `submit`. 
*   **GET:** Appends form data to the URL in name/value pairs. It is used for retrieving data (like a search query) and is less secure since data is visible in the URL.
*   **POST:** Sends form data inside the body of the HTTP request. It is used for sensitive data (like passwords) or when creating/updating data on the server. Data is not visible in the URL.

### 5. Portfolio Page
**Q: Explain the difference between CSS Flexbox and CSS Grid.**
**Answer:** 
*   **Flexbox** is designed for **one-dimensional** layouts—meaning it excels at laying out items in a single row OR a single column.
*   **CSS Grid** is designed for **two-dimensional** layouts—meaning it can handle both rows and columns simultaneously, making it perfect for complex overall page layouts.

### 6. Responsive Resume Web Page
**Q: What is a Media Query? What is "Mobile-First" design?**
**Answer:** A media query (`@media`) allows you to apply CSS styles only when a specific condition is true (e.g., `@media (max-width: 768px)` applies styles only on screens smaller than 768px). 
**Mobile-First design** is an approach where you write the default CSS for mobile devices first, and then use `min-width` media queries to progressively enhance the layout as the screen size increases for tablets and desktops.

### 7. Landing Page Small Business
**Q: How do color theory and typography impact UX?**
**Answer:** Color theory evokes emotions and guides attention (e.g., a bright contrasting color for a Call-To-Action button). Typography ensures readability and establishes brand identity. Good choices reduce cognitive load, making the site easy to navigate, which directly improves user retention and conversion rates.

---

## Phase 2: Client-Side Interactivity (Vanilla JavaScript)

### 8. Product Listing Page
**Q: What is the DOM? What is the difference between `getElementById` and `querySelector`?**
**Answer:** The **DOM (Document Object Model)** is a programming interface for web documents. It represents the page so that programs (like JavaScript) can change the document structure, style, and content.
*   `document.getElementById('id-name')` selects a single element specifically by its ID attribute. It is very fast.
*   `document.querySelector('.class-name')` is more flexible; it uses CSS selectors to find the *first* element that matches the query, whether it's an ID, class, or tag name.

### 9. Fashion Store Web App
**Q: Explain how array manipulation methods like `.filter()` and `.sort()` work.**
**Answer:** Both are higher-order array methods.
*   `.filter()` creates a *new* array with all elements that pass the test implemented by the provided function (e.g., filtering out items that cost more than $50).
*   `.sort()` sorts the elements of an array in place and returns the sorted array. It takes a compare function to determine the sorting logic (e.g., sorting prices ascending).

### 10. Bookstore Web App
**Q: What is JSON? How do you iterate over an array of objects to create HTML?**
**Answer:** **JSON (JavaScript Object Notation)** is a lightweight data-interchange format that is easy for humans to read and write. To create HTML dynamically, you can use the `.map()` method on an array of objects to generate an array of HTML string literals, and then use `.join('')` to combine them into a single string to inject into the DOM via `innerHTML`.

### 11. Food Ordering App
**Q: How do `change` and `input` event listeners differ?**
**Answer:** 
*   The `input` event fires *immediately* every time the value of an input element changes (e.g., every keystroke).
*   The `change` event fires only when the input loses focus (the user clicks away) after the value has been modified.

### 12. Movie Ticket Booking
**Q: Why use `classList.toggle()` instead of changing inline styles directly via JS?**
**Answer:** Changing inline styles directly (`element.style.backgroundColor = 'red'`) mixes structure and design, making code hard to maintain. Using `element.classList.toggle('selected')` allows you to define the visual state in CSS and simply use JavaScript to toggle the state on or off. It keeps concerns separated.

### 13. Weather Dashboard
**Q: Explain `fetch()`, Promises, and Async/Await.**
**Answer:** 
*   `fetch()` is a modern API used to make HTTP requests over the network. It operates asynchronously.
*   A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation.
*   **Async/Await** is syntactic sugar on top of Promises. Using `await` makes asynchronous code look and behave a bit more like synchronous code, making it much easier to read and debug.

### 14. Dashboard Student Performance
**Q: How do you map data arrays to visual elements?**
**Answer:** If you have an array of grades (e.g., `[80, 95, 60]`), you can use JavaScript to create `<div>` elements and dynamically set their inline CSS `width` property (or `height`) based on the array values, effectively creating a bar chart.

### 15. Sales Analytics
**Q: Explain the array `.reduce()` method.**
**Answer:** The `.reduce()` method executes a "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements is a single value (e.g., calculating the sum total of an array of transaction amounts).

### 16. Fitness Tracking
**Q: What is the difference between `localStorage`, `sessionStorage`, and Cookies?**
**Answer:** 
*   **localStorage:** Stores data with no expiration date. The data persists even when the browser is closed. Capacity is roughly 5MB.
*   **sessionStorage:** Stores data for one session. The data is lost when the browser tab is closed. Capacity is roughly 5MB.
*   **Cookies:** Can have an expiration date, but capacity is tiny (4KB). They are sent back and forth to the server with every HTTP request.

---

## Phase 3: Full-Stack Web Applications (MERN Stack)

### 17. College Website
**Q: Explain the MVC (Model-View-Controller) pattern in the context of the MERN stack.**
**Answer:** 
*   **Model:** The data structure. Handled by Mongoose Schemas (e.g., defining what an `Event` looks like).
*   **View:** The user interface. Handled by React (what the user sees on the screen).
*   **Controller:** The logic that links the Model and View. Handled by Express Route handlers (receiving a request from React, querying the Mongoose Model, and sending the data back).

### 18. Feedback System
**Q: What is a POST request payload, and what does `express.json()` do?**
**Answer:** When sending a POST request to create data (like new feedback), the data is sent in the body (the "payload") of the request. By default, Express doesn't know how to read JSON payloads. The middleware `app.use(express.json())` parses incoming requests with JSON payloads so you can access the data inside `req.body`.

### 19 a. Todo App
**Q: What are CRUD operations and their corresponding HTTP methods?**
**Answer:** 
*   **C**reate -> `POST` (Create a new task)
*   **R**ead -> `GET` (Fetch all tasks)
*   **U**pdate -> `PUT` or `PATCH` (Mark task as complete)
*   **D**elete -> `DELETE` (Remove a task)

### 19 b. Contact System
**Q: What are "Controlled Components" in React?**
**Answer:** In HTML, form elements like `<input>` usually maintain their own state. In React, a "Controlled Component" is an input form element whose value is controlled entirely by React state (using the `useState` hook). The input's `value` attribute is tied to the state variable, and an `onChange` handler updates the state.

### 20, 21. Appointment Booking
**Q: How are dates and times handled in MongoDB and JavaScript?**
**Answer:** JavaScript uses the `Date` object. When saving to MongoDB via Mongoose, dates are typically converted and stored as UTC ISODates (e.g., `2023-10-27T10:00:00.000Z`). When fetching data back, the frontend converts the UTC time to the user's local timezone for display.

### 20, 22. Used Vehicles
**Q: How do URL Query Parameters work in Express?**
**Answer:** Query parameters are appended to the end of a URL after a question mark (e.g., `/api/vehicles?make=Toyota&year=2020`). In an Express route handler, you access these values using the `req.query` object (e.g., `req.query.make` would equal "Toyota").

### 23. Rental Booking
**Q: How does the MERN stack communicate to manage state?**
**Answer:** React triggers an asynchronous `axios` request. While waiting for the Express server to respond, React might show a loading spinner. Express interacts with MongoDB, gets a result, and sends a JSON response back. React receives the JSON, updates its state via `setState`, and the component re-renders to reflect the new data.

### 24. Student Reviews
**Q: How do you calculate an average rating? Frontend vs Backend?**
**Answer:** 
*   **Frontend:** You can fetch all reviews, run a `.reduce()` function to sum the ratings, and divide by the array length. (Less efficient for large datasets).
*   **Backend:** A better approach is using MongoDB Aggregation (`$group` and `$avg`) to calculate the average on the database level and simply send the final number to the frontend.

### 25. Complaint System
**Q: What is the difference between PUT and PATCH HTTP methods?**
**Answer:** 
*   `PUT` is used to completely replace an existing resource with a new payload.
*   `PATCH` is used to make a partial update to an existing resource (e.g., only updating the "status" field of a complaint from 'Open' to 'Resolved' without sending the entire complaint object again).

### 26. Notes App
**Q: What does `timestamps: true` do in Mongoose schemas?**
**Answer:** When you pass `{ timestamps: true }` as an option to a Mongoose Schema, Mongoose automatically adds two fields to your document: `createdAt` and `updatedAt`. It also manages updating the `updatedAt` field automatically whenever the document is modified.

### 27. Lost and Found
**Q: What is the `useEffect` hook used for in React?**
**Answer:** The `useEffect` hook allows you to perform side effects in function components. The most common use case is fetching data from an API. By passing an empty dependency array `[]` as the second argument, you ensure the fetch request runs exactly once when the component first mounts to the screen.
