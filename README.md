# RR7 crud with supabase

This small project explores the capabilities and limitations of the RR7 (React Router v7) framework, specifically focusing on building a dynamic, nested menu system.

### 💡 What’s the Challenge?

RR7 lacks built-in support for dynamic route-based menus — the kind we’re used to with deeply nested routes and hierarchical navigation. Creating a flexible and recursive dropdown menu structure in this context requires some creative workarounds.

### 🔧 What I Built

To address this, I created a dynamic dropdown menu that reflects the nested routing structure. The core idea is a recursive <DropDown /> component that renders itself for each nested route — effectively mimicking the nested behavior of RR7 routes in the UI.

This recursive rendering is the heart of the project, and probably the most interesting part. It allows you to manage and visualize deeply nested routes in a clean and scalable way.

### 📌 Why It’s Cool

• Fully dynamic based on route structure

• Recursive component design — no hardcoded nesting

• Easy to extend and integrate into larger projects

🔍 Worth Checking Out
If you’re curious or just bored enough to be reading this far, I’d suggest diving into the <DropDown /> component — that’s where the magic happens.
