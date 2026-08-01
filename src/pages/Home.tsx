import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Container } from "../components/common/Container";
import { SectionTitle } from "../components/common/SectionTitle";
import { FeatureCard } from "../components/common/FeatureCard";
import { SearchBar } from "../components/search/SearchBar";
import { PopularSearchCard } from "../components/search/PopularSearchCard";

import { popularSearches } from "../data/popularSearches";
import { features } from "../data/features";

export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (value: string) => {
    if (value.trim().length === 0) return;

    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,theme(colors.blue.600/18%),transparent_65%)]"
          aria-hidden="true"
        />

        <Container className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold tracking-tight text-neutral-50 sm:text-6xl"
          >
            SAP Explain AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg"
          >
            Understand SAP errors, T-Codes and concepts instantly using AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-10 w-full max-w-xl"
          >
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmit}
              size="lg"
              autoFocus
            />
          </motion.div>
        </Container>
      </section>

      {/* Popular Searches */}
      <section className="pb-24">
        <Container>
          <SectionTitle
            eyebrow="Start here"
            title="Popular Searches"
            subtitle="Common runtime errors developers and Basis engineers run into every day."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularSearches.map((item, index) => (
              <PopularSearchCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="pb-28">
        <Container>
          <SectionTitle
            eyebrow="What it does"
            title="Built for how SAP actually works"
            subtitle="Four focused capabilities instead of a wall of documentation."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;