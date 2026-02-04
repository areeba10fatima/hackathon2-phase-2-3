---
description: "Task list for full-stack todo application implementation"
---

# Tasks: Full-Stack Multi-User Todo Application

**Input**: Design documents from `/specs/1-fullstack-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend directory structure with src/, tests/, requirements.txt
- [X] T002 Create frontend directory structure with src/app/, components/, lib/
- [X] T003 [P] Initialize backend requirements.txt with FastAPI, SQLModel, Neon dependencies
- [X] T004 [P] Initialize frontend package.json with Next.js 16+, TypeScript dependencies

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T005 Setup database schema and migrations framework with Neon Serverless PostgreSQL
- [X] T006 [P] Implement authentication/authorization framework with Better Auth and JWT validation
- [X] T007 [P] Setup API routing and middleware structure with FastAPI
- [X] T008 Create base models/entities that all stories depend on using SQLModel
- [X] T009 Configure error handling and logging infrastructure
- [X] T010 Setup environment configuration management
- [X] T011 [P] Implement security middleware to enforce user data access restrictions

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Registration and Login (Priority: P1) 🎯 MVP

**Goal**: Enable new users to create accounts and log in to access the todo application securely

**Independent Test**: Can be fully tested by registering a new user account and successfully logging in, then accessing the application dashboard. This delivers the core value of enabling secure user access.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T012 [P] [US1] Contract test for auth endpoints in backend/tests/contract/test_auth.py
- [ ] T013 [P] [US1] Integration test for user registration/login in backend/tests/integration/test_auth.py

### Implementation for User Story 1

- [X] T014 [P] [US1] Create User model in backend/src/models/user.py
- [X] T015 [US1] Create JWT authentication middleware in backend/src/middleware/jwt_auth.py
- [X] T016 [US1] Implement UserService in backend/src/services/auth_service.py
- [X] T017 [US1] Implement auth endpoints in backend/src/api/auth.py
- [X] T018 [US1] Create signup page component in frontend/src/app/signup/page.tsx
- [X] T019 [US1] Create login page component in frontend/src/app/login/page.tsx
- [X] T020 [US1] Configure Better Auth in frontend/src/app/api/auth/[[...auth]].ts
- [X] T021 [US1] Create LoginForm component in frontend/src/components/LoginForm.tsx
- [X] T022 [US1] Create SignupForm component in frontend/src/components/SignupForm.tsx
- [X] T023 [US1] Create ProtectedRoute component in frontend/src/components/ProtectedRoute.tsx
- [X] T024 [US1] Add JWT handling in frontend/src/lib/auth.ts
- [X] T025 [US1] Create API client in frontend/src/lib/api.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management (Create, Read, Update, Delete) (Priority: P1)

**Goal**: Allow authenticated users to manage their personal tasks by creating, viewing, updating, and deleting todos

**Independent Test**: Can be fully tested by an authenticated user creating a task, viewing it, updating it, and deleting it. This delivers the primary value of task management.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US2] Contract test for task endpoints in backend/tests/contract/test_tasks.py
- [ ] T027 [P] [US2] Integration test for task operations in backend/tests/integration/test_tasks.py

### Implementation for User Story 2

- [X] T028 [P] [US2] Create Task model in backend/src/models/task.py
- [X] T029 [US2] Implement TaskService in backend/src/services/task_service.py
- [X] T030 [US2] Implement task CRUD endpoints in backend/src/api/tasks.py
- [X] T031 [US2] Create dashboard page component in frontend/src/app/dashboard/page.tsx
- [X] T032 [US2] Create TaskList component in frontend/src/components/TaskList.tsx
- [X] T033 [US2] Create TaskItem component in frontend/src/components/TaskItem.tsx
- [X] T034 [US2] Connect frontend to backend API for task operations in frontend/src/lib/api.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Completion Toggle (Priority: P2)

**Goal**: Allow authenticated users to mark their tasks as complete or incomplete to track their progress

**Independent Test**: Can be fully tested by an authenticated user toggling the completion status of their tasks and seeing the status persist. This delivers value by improving task organization.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T035 [P] [US3] Contract test for task toggle endpoint in backend/tests/contract/test_task_toggle.py

### Implementation for User Story 3

- [X] T036 [US3] Implement PATCH /api/tasks/{task_id}/toggle-complete endpoint in backend/src/api/tasks.py
- [X] T037 [US3] Update TaskItem component to include completion toggle in frontend/src/components/TaskItem.tsx
- [X] T038 [US3] Update TaskService to handle completion toggle in backend/src/services/task_service.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Integration & Wiring

**Purpose**: Connect frontend and backend components

- [X] T039 [P] Implement JWT header attachment in API client in frontend/src/lib/api.ts
- [X] T040 [P] Implement error handling across frontend components
- [X] T041 [P] Implement auth state management in frontend/src/lib/auth.ts
- [X] T042 [P] Connect dashboard to task API endpoints in frontend/src/app/dashboard/page.tsx
- [X] T043 [P] Add loading states and error handling to all frontend components

---

## Phase 7: DevOps & Config

**Purpose**: Environment setup and deployment configuration

- [X] T044 Set up environment variables for backend in backend/.env
- [X] T045 Set up environment variables for frontend in frontend/.env.local
- [X] T046 Configure Neon DB connection in backend/src/database/database.py
- [X] T047 [P] Create Docker compose file for local development alignment

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T048 [P] Documentation updates in docs/
- [ ] T049 Code cleanup and refactoring
- [ ] T050 Performance optimization across all stories
- [ ] T051 [P] Additional unit tests (if requested) in tests/unit/
- [ ] T052 Security hardening
- [ ] T053 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Integration (Phase 6)**: Depends on User Stories 1 and 2 completion
- **DevOps (Phase 7)**: Can run in parallel with other phases
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 (auth) and Foundational (Phase 2)
- **User Story 3 (P2)**: Depends on User Stories 1 and 2 completion

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Integration and DevOps tasks can run in parallel with user story development

---

## Parallel Example: User Story 2

```bash
# Launch all tests for User Story 2 together (if tests requested):
Task: "Contract test for task endpoints in backend/tests/contract/test_tasks.py"
Task: "Integration test for task operations in backend/tests/integration/test_tasks.py"

# Launch all models for User Story 2 together:
Task: "Create Task model in backend/src/models/task.py"
Task: "Implement TaskService in backend/src/services/task_service.py"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Registration/Login)
4. Complete Phase 4: User Story 2 (Task Management)
5. **STOP and VALIDATE**: Test User Stories 1 & 2 together - users can register, log in, and manage tasks
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Login working!)
3. Add User Story 2 → Test with Story 1 → Deploy/Demo (Core functionality!)
4. Add User Story 3 → Test with previous stories → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication)
   - Developer B: User Story 2 (Task Management)
   - Developer C: Begin User Story 3 (Completion Toggle) once US2 is stable
3. Integration developer: Work on connecting frontend/backend
4. DevOps developer: Set up environments and configurations
5. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence