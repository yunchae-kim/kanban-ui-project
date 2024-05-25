# Kanban Board Project

## Overview

This project is a Kanban board implementation that allows users to create, edit, delete, and move tasks between different columns representing different statuses. The project is built using React and TypeScript, with Tailwind CSS for styling.

## Features

1. **Task Creation and Editing**:

   - Users can create tasks by inputting a title and adding multiple tags.
   - Tasks can be edited to adjust details, including title and tags.
   - Tasks can be deleted, with a confirmation modal for user confirmation.

2. **Kanban Board**:

   - The board consists of three columns: "To Do", "In Progress", and "Done".
   - Tasks can be dragged and dropped between columns to change their status.
   - Task information is truncated when necessary to prevent information overload.
   - Icons next to each task allow for easy access to edit or delete
     functionalities.

3. **Tag Filtering**:

   - Users can filter tasks by tags to view only the tasks that match the
     selected tags.

4. **Column Filtering**:

   - Users can filter column tasks to view only the tasks that match the
     selected status.

## Project Structure

### Components and Their Roles

1. **`KanbanBoard.tsx`**:
   - The main component that holds the structure of the Kanban board.
   - Manages state for tasks, modal visibility, and tag selection.
   - Handles task creation, updating, deletion, and drag-and-drop functionality.
2. **`TaskColumn.tsx`**:
   - Represents each column in the Kanban board.
   - Displays tasks based on their status.
   - Includes functionality for dragging and dropping tasks.
   - Provides buttons for creating new tasks and editing/deleting existing tasks.
3. **`TaskModal.tsx`**:

   - A modal component for creating and editing tasks.
   - Displays a form for inputting task details.
   - Conditionally renders the appropriate form (create or edit) based on the task.

4. **`TaskForm.tsx`**:

   - A form component for creating new tasks.
   - Allows users to input task titles and tags.
   - Includes functionality for handling duplicate tag warnings.

5. **`EditTaskForm.tsx`**:

   - A form component for editing existing tasks.
   - Similar to `TaskForm.tsx` but pre-fills the form with existing task details.
   - Includes duplicate tag warning functionality.

6. **`ConfirmModal.tsx`**:

   - A modal component for confirming task deletions.
   - Asks users for confirmation before deleting a task.

7. **`TagSelector.tsx`**:
   - A component for selecting and creating tags.
   - Allows users to filter tasks by tags.

## Tech Stack

- **TypeScript**: For stable and modularizable code.
- **Tailwind CSS**: For rapid and efficient styling.

### Time Spent

- Project planning and structuring: 30 minutes
- Development and implementation: 5 hours
- Code refinement and CSS optimization: 1 hour
- **Total**: 6 hours 30 minutes
