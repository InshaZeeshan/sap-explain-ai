import type { SapKnowledgeItem } from "../types";

/**
 * Local knowledge base used by the search service.
 * This stands in for a real backend today. The service layer
 * (see src/services/searchService.ts) is the only place that
 * touches this file, so swapping it for SAP OData / SAP Gateway /
 * Gemini AI later requires no changes to components or pages.
 */
export const knowledgeBase: SapKnowledgeItem[] = [
  {
    id: "err-objects-objref-not-assigned",
    code: "OBJECTS_OBJREF_NOT_ASSIGNED",
    title: "OBJECTS_OBJREF_NOT_ASSIGNED",
    category: "error",
    shortDescription:
      "ABAP runtime error raised when a program accesses an object reference that was never assigned.",
    description:
      "This short dump occurs when the program tries to use an object reference variable (e.g. call a method, access an attribute) while that reference is still initial — meaning CREATE OBJECT was never executed, or the reference was cleared/set to nothing beforehand.",
    details: [
      "CREATE OBJECT was never called for the reference variable",
      "The object reference was explicitly cleared (CLEAR obj / obj = NULL)",
      "A method returned an unassigned reference that was used without a check",
      "The object went out of scope earlier than expected",
    ],
    actions: [
      "Check IS BOUND / IS NOT INITIAL on the reference before use",
      "Ensure CREATE OBJECT is executed on every code path before first use",
      "Use the ABAP Debugger or ST22 to inspect the exact line and variable value",
      "Add defensive TRY / CATCH around risky method calls",
    ],
  },
  {
    id: "err-call-function-not-found",
    code: "CALL_FUNCTION_NOT_FOUND",
    title: "CALL_FUNCTION_NOT_FOUND",
    category: "error",
    shortDescription:
      "Runtime error when a called function module cannot be found, locally or via RFC.",
    description:
      "Raised when CALL FUNCTION (or CALL FUNCTION ... DESTINATION) references a function module that does not exist in the target system, was not transported, or is not remote-enabled when called remotely.",
    details: [
      "The function module was deleted, renamed, or never transported to this system",
      "The RFC destination points to the wrong system or client",
      "The function module is not flagged as 'Remote-Enabled Module'",
      "A typo in the function module name at the call site",
    ],
    actions: [
      "Verify the function module exists in SE37 in the target system",
      "Check the RFC destination configuration in SM59",
      "Confirm the 'Remote-Enabled Module' flag under Attributes in SE37",
      "Re-transport the function module if it is missing in the target client",
    ],
  },
  {
    id: "err-dbsql-sql-error",
    code: "DBSQL_SQL_ERROR",
    title: "DBSQL_SQL_ERROR",
    category: "error",
    shortDescription:
      "Runtime error caused by an unhandled database error during an Open SQL statement.",
    description:
      "This dump surfaces when the underlying database returns an error for an Open SQL statement (INSERT, UPDATE, SELECT, etc.) that ABAP does not automatically handle — for example a primary key violation, a full tablespace, or an invalid object.",
    details: [
      "Duplicate key on INSERT into a table with a unique/primary key",
      "Database tablespace or filesystem is full",
      "A referenced table or view is inconsistent or not activated",
      "Missing exception handling around a statement that can legitimately fail",
    ],
    actions: [
      "Open the dump in ST22 and read the exact database return code",
      "Wrap the statement in TRY / CATCH or check SY-SUBRC explicitly",
      "Ask Basis to check tablespace/filesystem usage if it's a space issue",
      "Re-activate or repair the table/view definition in SE11 if inconsistent",
    ],
  },
  {
    id: "err-tsv-tnew-page-alloc-failed",
    code: "TSV_TNEW_PAGE_ALLOC_FAILED",
    title: "TSV_TNEW_PAGE_ALLOC_FAILED",
    category: "error",
    shortDescription:
      "Runtime error indicating the program could not allocate additional memory (extended memory exhausted).",
    description:
      "This dump means the work process ran out of memory it was allowed to use — usually because an internal table or data object grew far beyond what was expected, or memory parameters are too low for the workload.",
    details: [
      "Unbounded growth of an internal table (e.g. inside a loop with no exit)",
      "Selecting large result sets into ABAP instead of filtering on the database",
      "A recursive call without a proper termination condition",
      "Extended memory parameters (em/initial_size_MB, ztta/roll_extension) are too low",
    ],
    actions: [
      "Review ST22 for the exact statement and table sizes at time of failure",
      "Push filtering/aggregation to the database instead of doing it in ABAP",
      "FREE or CLEAR large internal tables as soon as they are no longer needed",
      "Work with Basis to review memory parameters via SM50 / SM66 if it's systemic",
    ],
  },
  {
    id: "tcode-se11",
    code: "SE11",
    title: "ABAP Dictionary (SE11)",
    category: "tcode",
    shortDescription:
      "Central transaction for creating and maintaining database tables, structures, views, data elements, and domains.",
    description:
      "SE11 is the entry point to the ABAP Dictionary (DDIC), where all data definitions used across SAP — tables, structures, data elements, domains, search helps, and views — are created, changed, and activated.",
    details: [
      "Creating and changing transparent tables",
      "Defining reusable data elements and domains",
      "Building table maintenance views and structures",
      "Reviewing technical settings such as buffering and size category",
    ],
    actions: [
      "Use Utilities > Where-Used List before changing a field used elsewhere",
      "Always activate objects immediately after saving to avoid inconsistencies",
      "Prefer append/include structures over direct changes to SAP standard tables",
    ],
  },
  {
    id: "tcode-se38",
    code: "SE38",
    title: "ABAP Editor (SE38)",
    category: "tcode",
    shortDescription:
      "Transaction used to create, edit, test, and debug ABAP programs and includes.",
    description:
      "SE38 is the classic ABAP Editor for writing executable programs, includes, and function groups, running them directly for testing, and jumping into the debugger.",
    details: [
      "Writing and editing executable programs and includes",
      "Running a program directly to test its output",
      "Launching the ABAP Debugger against a running session",
      "Checking syntax with the built-in syntax checker",
    ],
    actions: [
      "Use Pretty Printer (Shift+F1) to keep formatting consistent",
      "Set an external breakpoint to debug a specific user's session",
      "Consider SE80 or ADT (Eclipse) for a more integrated object view",
    ],
  },
  {
    id: "tcode-st22",
    code: "ST22",
    title: "ABAP Dump Analysis (ST22)",
    category: "tcode",
    shortDescription:
      "Displays and analyzes ABAP runtime errors (short dumps) across the system.",
    description:
      "ST22 is the first stop when a runtime error occurs. It shows the exact program, include, and line where the dump happened, along with variable values and a system-generated error analysis.",
    details: [
      "Reviewing the program, include, and line number of a short dump",
      "Inspecting SY-SUBRC and variable values at the moment of failure",
      "Identifying the root cause of errors like OBJECTS_OBJREF_NOT_ASSIGNED",
    ],
    actions: [
      "Always read 'What happened?' and 'Error analysis' first",
      "Cross-check with SM21 (system log) for related system events",
      "Filter by date, user, or program to spot recurring patterns",
    ],
  },
  {
    id: "concept-rfc",
    code: "RFC",
    title: "RFC (Remote Function Call)",
    category: "concept",
    shortDescription:
      "SAP's standard interface technology for calling function modules across systems.",
    description:
      "RFC is the mechanism SAP systems use to call function modules in another system — SAP-to-SAP or SAP-to-external — synchronously, asynchronously (aRFC), or transactionally (tRFC/qRFC), forming the backbone of most SAP integration scenarios.",
    details: [
      "Enables synchronous, asynchronous, and transactional communication",
      "Requires an RFC destination configured in SM59",
      "The target function module must be flagged 'Remote-Enabled Module'",
    ],
    actions: [
      "SM59 — RFC Destinations",
      "BAPI — standardized, remote-enabled function modules",
      "CALL_FUNCTION_NOT_FOUND runtime error",
    ],
  },
  {
    id: "concept-transport-request",
    code: "TRANSPORT REQUEST",
    title: "Transport Request",
    category: "concept",
    shortDescription:
      "The mechanism SAP uses to move development changes between systems (Dev → QA → Production).",
    description:
      "A transport request bundles the objects a developer changes so they can be consistently moved through the landscape. It consists of a header request and one or more tasks, and once released, generates transport files picked up by STMS.",
    details: [
      "Made up of a request and one or more developer tasks",
      "Objects are locked to a request as soon as they are changed",
      "A released request produces a data file and cofile for STMS to import",
    ],
    actions: [
      "SE09 / SE10 — Transport Organizer",
      "STMS — Transport Management System",
      "Always release tasks before releasing the parent request",
    ],
  },
];