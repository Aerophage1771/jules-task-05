1. **Analyze Requirements:** Review the design system, content requirements (Level 3A - Trap Map), and taxonomy data.
2. **Data Preparation:** Write a Node.js script (`build.js`) containing the data for all 21 LR question types, grouped by the 7 families.
3. **HTML Generation:** Implement `build.js` to generate three distinct HTML files (`variant-1.html`, `variant-2.html`, `variant-3.html`) adhering to the Sunlit Botanical Editorial theme:
   - *Variant 1:* Card-based layout with vertical columns.
   - *Variant 2:* Horizontal process bands with distinct sections for Task, Stem, Method, and Trap.
   - *Variant 3:* Dense matrix/table layout for high information density.
4. **Screenshot Generation:** Write a Playwright script (`screenshot.js`) to render each HTML file, emulate print media, and take screenshots of every `.pdf-page` element at the correct 10x8 inch (960x768px) aspect ratio.
5. **QA Cycles:**
   - *Cycle 1 (Structural):* Ensure the layout adheres to 5:4 landscape and contains all required content.
   - *Cycle 2 (Instructional):* Verify typography, hierarchy, and that the instructional content is legible.
   - *Cycle 3 (Final Print):* Confirm Theme 03 styling rules (colors, bloom, whitespace) are applied correctly.
6. **Pre-commit Steps:** Complete required testing, verification, review, and reflection.
7. **Submission:** Commit the code and the `proof/` directory, push to the branch, and open a PR.
