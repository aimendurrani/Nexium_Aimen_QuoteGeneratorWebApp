
# **Random Quote Generator Web App**

---

**Overview**
This project is a **Random Quote Generator Web Application** developed as part of Assignment 1 for the **Nexium Internship Program**. The application allows users to search motivational quotes based on specific **topics** or **tags**, and displays up to **three relevant quotes** in a clean, user-friendly interface.

It demonstrates core web development skills using **Next.js (App Router)**, **TypeScript**, **ShadCN UI**, and **custom styling**, while emphasizing good coding practices, UI responsiveness, and user interactivity.

---

**Live Deployment**
You can access the deployed application here:
**[Quote Generator WebApp](https://nexium-aimen-quote-generator-web-ap.vercel.app/)**

---

**Key Features**

* Real-time **search functionality** by topic or tag
* **Interactive suggestion dropdown** while typing
* Displays up to **three quotes** based on the search query
* Displays a **“No quotes found”** message only after a search
* Clean and responsive **UI layout**
* Custom **background image** for enhanced user experience
* Built using the **App Router** in Next.js 13+

---

**Technologies Used**

* Next.js (13+, App Router)
* React and TypeScript
* ShadCN UI (based on Tailwind CSS and Radix UI)
* CSS for layout and responsiveness
* pnpm for package management
* Vercel for deployment

---

**Folder Structure**

```
Nexium_Aimen_QuoteGeneratorWebApp/
├── assignment-1/
│   ├── app/
│   │   └── page.tsx        → Main page with logic and UI
│   ├── components/ui/      → ShadCN UI components used in the app
│   ├── lib/quotes.ts       → Array of quotes with topics and tags
│   └── public/background.png → Background image used on the main screen
├── .gitignore
├── README.md
└── package.json
```

---

**How to Run Locally**

1. **Clone the repository**

   ```
   git clone https://github.com/aimendurrani/Nexium_Aimen_QuoteGeneratorWebApp.git
   cd Nexium_Aimen_QuoteGeneratorWebApp/assignment-1
   ```

2. **Install dependencies**
   If you use `pnpm` (recommended for this project):

   ```
   pnpm install
   ```

   Or with `npm`:

   ```
   npm install
   ```

3. **Run the development server**

   ```
   pnpm dev
   ```

   Or if using `npm`:

   ```
   npm run dev
   ```

4. Open your browser and go to:

   ```
   http://localhost:3000
   ```

---

**How It Works**

* The app imports a predefined list of quotes from `quotes.ts`
* As the user types, suggestions are filtered and displayed dynamically
* On form submission, quotes matching the **topic** or **tags** are displayed
* A maximum of three quotes are shown at a time
* If no matching quotes are found, a fallback message is displayed

---

**Notes**

* The application supports searching with either **topic keywords** or **tags** like "motivation", "success", "growth", etc.
* The background image is stored in the `/public` folder and loaded with `backgroundImage: url('/background.png')`
* The suggestion dropdown disappears once a result is selected or submitted

