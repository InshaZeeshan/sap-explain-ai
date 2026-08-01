import { motion } from "framer-motion";
import { Container } from "../components/common/Container";
import { SectionTitle } from "../components/common/SectionTitle";

const stack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS v4",
  "React Router DOM",
  "Framer Motion",
  "Node.js",
  "Express.js",
  "Gemini API",
];

const features = [
  "Local-first search using a curated SAP knowledge base",
  "AI-generated explanations when a local answer is unavailable",
  "Support for SAP T-Codes, ABAP concepts, errors, and technical questions",
  "Secure server-side Gemini API integration",
];

const futureImprovements = [
  {
    title: "Structured SAP Answers",
    description:
      "Instead of returning a generic paragraph, responses can be organized according to the type of SAP query — for example category, module or area, purpose, common uses, related T-Codes, relevant objects, and beginner-friendly explanations.",
  },
  {
    title: "Intelligent Query Classification",
    description:
      "Queries can be automatically identified as T-Codes, ABAP concepts, error messages, dumps, development objects, or troubleshooting questions so that each type receives a more appropriate response format.",
  },
  {
    title: "Guided Error Troubleshooting",
    description:
      "SAP errors and dumps can be presented with a structured flow containing the error meaning, possible causes, investigation steps, relevant transactions, and suggested next actions.",
  },
  {
    title: "ABAP Code Explanation",
    description:
      "A future developer mode could allow users to submit ABAP snippets and receive explanations of the code, important statements, potential issues, and related ABAP concepts.",
  },
  {
    title: "Related SAP Knowledge",
    description:
      "Answers can recommend related T-Codes, ABAP objects, concepts, transactions, or development tools so that a single search becomes a path for further learning.",
  },
  {
    title: "SAP System Integration",
    description:
      "Future integration with SAP OData services, SAP Gateway, or SAP BTP could allow the application to combine general explanations with authorized real-system context instead of relying only on static knowledge and AI.",
  },
];

export function About() {
  return (
    <Container className="py-16">
      <SectionTitle
        align="left"
        eyebrow="About this project"
        title="Why SAP Explain AI exists"
        subtitle="A personal portfolio project exploring how general AI capabilities can be adapted into a focused technical assistant for the SAP ecosystem."
      />

      {/* Why This Project Exists */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-12 rounded-2xl border border-blue-900/40 bg-neutral-900/60 p-6 sm:p-7"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-400">
          Why Not Just Use General AI?
        </h3>

        <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-300">
          <p>
            General-purpose AI tools can already answer many SAP questions,
            but they are designed to answer almost anything. SAP Explain AI
            explores a different approach: creating a focused technical
            assistant designed specifically around SAP terminology, concepts,
            and developer workflows.
          </p>

          <p>
            Instead of sending every question directly to an AI model, the
            application first checks a curated SAP knowledge base for known
            information. When no local result is available, the query is sent
            securely through the backend to an AI model for an explanation.
            This creates a hybrid knowledge system rather than simply placing
            a search interface in front of an LLM.
          </p>

          <p>
            The goal is not to compete with general-purpose AI. It is to
            explore how those AI capabilities can be combined with
            domain-specific knowledge, structured responses, and SAP-focused
            workflows to create a more specialized developer experience.
          </p>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          How It Works Today
        </h3>

        <ul className="mt-4 space-y-2">
          {features.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed text-neutral-300"
            >
              <span className="mr-2 text-neutral-600">—</span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Future Vision */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-400">
            Future Vision
          </h3>

          <h2 className="mt-2 text-2xl font-semibold text-neutral-50">
            From SAP search to SAP technical assistant
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-400">
            The current version establishes the search, backend, and AI
            architecture. Future versions can make the experience increasingly
            SAP-aware by understanding what kind of question is being asked
            and presenting the answer in a format designed for that specific
            SAP problem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {futureImprovements.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
            >
              <h4 className="font-semibold text-neutral-100">
                {item.title}
              </h4>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Example Future Response */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Example of the Future Experience
        </h3>

        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Instead of returning only a paragraph for a query such as SE80, a
          future version could recognize it as an SAP transaction and generate
          a structured result such as:
        </p>

        <div className="mt-6 rounded-xl border border-blue-900/40 bg-neutral-950/70 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-semibold text-neutral-50">
              SE80 — Object Navigator
            </h4>

            <span className="rounded-full border border-blue-900/60 bg-blue-950/40 px-2.5 py-1 text-[11px] font-medium text-blue-300">
              Transaction Code
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Area
              </p>
              <p className="mt-1 text-sm text-neutral-300">
                ABAP Development
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Purpose
              </p>
              <p className="mt-1 text-sm text-neutral-300">
                Navigate and manage ABAP Repository objects.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Common Uses
              </p>
              <p className="mt-1 text-sm text-neutral-300">
                Programs, classes, function groups, packages, and development
                objects.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Related T-Codes
              </p>
              <p className="mt-1 text-sm text-neutral-300">
                SE38 · SE24 · SE11
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-800 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Beginner Explanation
            </p>

            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Think of SE80 as a central workspace for exploring and working
              with different ABAP development objects from one place.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Tech Stack
        </h3>

        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1 text-xs font-medium text-neutral-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Architecture
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-neutral-300">
          SAP Explain AI uses a local-first search architecture. Submitted
          queries are first checked against the application's curated SAP
          knowledge base. When no local result is available, the React
          frontend sends the query to a Node.js and Express backend, which
          securely communicates with the Gemini API and returns an
          AI-generated explanation.
        </p>

        <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
          <p className="text-center text-xs leading-6 text-neutral-400 sm:text-sm">
            React + TypeScript
            <span className="mx-2 text-blue-400">→</span>
            Local Knowledge Base
            <span className="mx-2 text-blue-400">→</span>
            Express Backend
            <span className="mx-2 text-blue-400">→</span>
            Gemini API
          </p>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-10 max-w-3xl text-sm leading-relaxed text-neutral-400"
      >
        SAP Explain AI is an independent learning and portfolio project and is
        not affiliated with SAP. AI-generated explanations may contain
        inaccuracies and should be verified before being used in a production
        SAP environment.
      </motion.p>
    </Container>
  );
}

export default About;