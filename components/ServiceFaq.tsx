type FaqItem = { question: string; answer: string };

export default function ServiceFaq({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="service-faq" aria-labelledby="faq-heading">
      <div className="eyebrow">
        <span className="dash" />
        ANSWERS BEFORE THE CALL
      </div>
      <h2 id="faq-heading">Common questions.</h2>
      <div className="service-faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
