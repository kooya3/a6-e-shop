

# Contributing to a6-e-shop

Thank you for considering contributing to a6-e-shop! We value your contributions and look forward to your involvement in enhancing the project. This guide will help you get started and provide instructions on how to contribute effectively.

## Getting Started

### Fork and Clone the Repository

1. **Fork this repository**  
   Visit the [repository](https://github.com/DarkInventor/a6-e-shop) and click the "Fork" button to create a copy of the repository in your GitHub account.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/a6-e-shop.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd a6-e-shop
   ```

4. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-feature
   ```

5. **Install dependencies**

   ```bash
   yarn install
   ```

6. **Set up environment variables**

   Create a `.env.local` file by copying the example:

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required environment variables.

7. **Run the project**

   Start the development server:

   ```bash
   yarn dev
   ```

## Adding a New Feature or Component

### 1. Add Your Component

- Add your new component in the appropriate directory, such as `src/components/`, depending on the feature or component you are contributing.

### 2. Update the Related Pages

- If applicable, update the pages or templates that utilize your new component. For example, you may need to update `/src/pages/templates/[template].tsx` to include your new component.

### 3. Test Your Changes

- Ensure that your changes are working as expected. You can add unit tests for your component if necessary.

### 4. Document Your Changes

- Document the functionality of your component or feature in the relevant Markdown files, such as `README.md` or `docs/`.

## Opening a Pull Request

1. **Push your branch to your fork**

   ```bash
   git push origin my-new-feature
   ```

2. **Open a pull request**

   Go to your forked repository on GitHub and click on the "Compare & pull request" button. Provide a clear title and description for your pull request, outlining the changes you made.

3. **Address Feedback**

   Collaborate with the project maintainers by addressing any feedback or requested changes. Once your pull request is approved, it will be merged into the main repository.

## Guidelines for Contributions

### Coding Standards

- Follow the existing coding style and conventions used in the project.
- Use meaningful names for variables, functions, and components.
- Ensure that your code is well-structured and easy to understand.

### Commit Messages

- Write clear and concise commit messages.
- Use the present tense and capitalize the first letter (e.g., "Add feature X").

### Testing

- If possible, write tests for your changes.
- Ensure that existing tests pass before submitting your pull request.

## Need Help?

If you have any questions or need assistance, feel free to open an issue on GitHub, and we'll be happy to help

---

This `CONTRIBUTING.md` file should give clear guidance to potential contributors and ensure that contributions are consistent and well-documented.
