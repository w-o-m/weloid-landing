import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CONSTANTS from "@/lib/constants";
import ContactForm from "./ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Weloid",
  description:
    "Contact Weloid about software engineering, technical investigations, partnerships, or general enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className={`shell noise ${styles.page}`}>
      <Header active="contact" />

      <main className={styles.main}>
        <section className={styles.intro}>
          <div className="eyebrow">
            <span className="dash" />
            CONTACT — OPEN CHANNELS
          </div>
          <h1 className={styles.title}>
            Start with the
            <br />
            <span>signal.</span>
          </h1>
          <p className={styles.lead}>
            For software problems, send us the evidence. For partnerships,
            questions, or everything else, send a direct message.
          </p>

          <div className={styles.actions}>
            <Link href="/open-a-case" className="btn btn-shadow">
              OPEN A CASE
            </Link>
            <a className="btn btn-outline" href="#contact-form">MESSAGE US</a>
          </div>

          <div className={styles.directLine}>
            <span>DIRECT LINE</span>
            <a href={`mailto:${CONSTANTS.email}`}>{CONSTANTS.email}</a>
          </div>
        </section>

        <section id="contact-form" className={styles.channels} aria-label="Contact form">
          <ContactForm />
          <div className={styles.socialBlock}>
            <div className={styles.channelsHeader}>
              <span>SOCIAL CHANNELS</span>
              <span>{String(CONSTANTS.socials.length).padStart(2, "0")} ACTIVE</span>
            </div>
            <div className={styles.channelList}>
              {CONSTANTS.socials.map((social, index) => (
                <a
                  key={social.name}
                  className={styles.channel}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.channelNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.channelName}>{social.name}</span>
                  <span className={styles.channelHandle}>{social.handle}</span>
                  <span className={styles.channelArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer
        tagline="BUILD · RESCUE · INVESTIGATE · SCALE"
        taglineStyle={{
          font: "400 11px/1 var(--font-mono)",
          letterSpacing: ".18em",
          color: "#8a8271",
        }}
      />
    </div>
  );
}
