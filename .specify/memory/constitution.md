<!-- SYNC IMPACT REPORT:
Version change: N/A -> 1.0.0
Modified principles: None (new constitution)
Added sections: All sections added to replace template
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending review
Follow-up TODOs: None
-->

# Todo Application Constitution

## Core Principles

### Spec-Driven Development
All implementation must strictly follow specs under /specs; Implementation proceeds only after spec completion and approval; Every feature must have a corresponding specification document before coding begins.

### Full-Stack Implementation
Backend and frontend must be implemented together when required; Both client and server components developed in parallel; Complete feature delivery includes both UI and API layers.

### Security-First Architecture
Every API request must require JWT; JWT must be validated in FastAPI; Users can ONLY access their own data; Data ownership must be enforced on every operation.

### Tech Stack Adherence
Fixed technology stack: Next.js 16+ App Router (Frontend), Python FastAPI (Backend), SQLModel (ORM), Neon Serverless PostgreSQL (Database), Better Auth (Authentication); No deviation from specified technologies without explicit approval.

### Monorepo Structure
Single repository structure with proper separation of concerns; All components coexist in one repository; Shared dependencies managed centrally; Cross-component integration tested continuously.

### Authentication Enforcement
REST API secured with JWT; Better Auth for frontend authentication; JWT verification in backend; Multi-user support with proper isolation.

## Additional Constraints

Full-Stack Web Application (NOT CLI); Multi-user support with authentication; Persistent storage using Neon Serverless PostgreSQL; Authentication using Better Auth (frontend) + JWT verification (backend); Tech Stack is FIXED and NON-NEGOTIABLE; Users can ONLY access their own tasks; Task ownership must be enforced on every operation.

## Development Workflow

Agentic Dev Stack workflow: 1. Read spec, 2. Generate plan, 3. Break into tasks, 4. Implement iteratively; Always read relevant specs before implementing; No manual coding by the user is allowed; All implementation must strictly follow specs; Respect monorepo structure; Backend and frontend must be implemented together when required.

## Governance

Spec-Kit Plus spec-driven development must be followed strictly; All implementation work must reference and comply with this constitution; Any deviation from stated principles requires constitutional amendment; All pull requests must verify compliance with constitutional principles; Manual coding by users is prohibited; Implementation must follow the defined workflow strictly.

**Version**: 1.0.0 | **Ratified**: 2026-01-28 | **Last Amended**: 2026-01-28