export default function Home() {
  return (
    <>
      <h2 className="sr-only">Gatorpower</h2>

      <section className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        {/* Wordmark placeholder — swap for engraved logo asset later */}
        <p aria-hidden="true" className="text-5xl font-bold tracking-widest uppercase">
          Gatorpower
        </p>

        <p className="max-w-xl text-lg italic">
          Purveyors of Fine Full-Stack Workmanship — Est. 1999
        </p>

        <p className="max-w-2xl text-base">
          React, TypeScript, GraphQL, Node, Java, and SQL. Twenty-seven years
          of building for the web across government, healthcare, and commerce.
        </p>

        <div className="flex gap-4">
          <a
            href="#work"
            className="border-2 border-current px-6 py-3 font-semibold uppercase tracking-wide"
          >
            View the Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 font-semibold uppercase tracking-wide underline underline-offset-4"
          >
            Correspondence
          </a>
        </div>
      </section>
    </>
  );
}