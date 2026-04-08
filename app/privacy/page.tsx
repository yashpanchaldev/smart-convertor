export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>Last updated: April 7, 2026</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Privacy Policy</h1>
        <p style={{ color: "var(--muted)" }}>
          SmartConverter is built with privacy as the default. Here&apos;s exactly what happens — and what doesn&apos;t — when you use our tools.
        </p>
      </div>

      <div className="space-y-10" style={{ color: "var(--foreground)" }}>
        <Section title="No file uploads">
          All conversions run entirely in your browser using client-side JavaScript. Your files never leave your device. We do not have servers that receive, process, or store your files at any point.
        </Section>

        <Section title="No accounts required">
          You don&apos;t need to sign up, log in, or provide any personal information to use SmartConverter. There are no accounts, no profiles, and no user data collected.
        </Section>

        <Section title="No data collection">
          We do not collect, store, or sell any personal data. We do not track what files you convert, what content is in those files, or any other usage-specific information tied to you.
        </Section>

        <Section title="Analytics">
          We may use privacy-respecting, anonymous analytics (e.g. page view counts) to understand general usage patterns. This data is aggregated, contains no personally identifiable information, and is never sold to third parties.
        </Section>

        <Section title="Cookies">
          We use a single cookie to remember your dark/light mode preference. No tracking cookies, no advertising cookies, no third-party cookies are set by SmartConverter.
        </Section>

        <Section title="Advertisements">
          SmartConverter displays third-party advertisements to support free access to the tools. Ad providers may set their own cookies and collect data according to their own privacy policies. We recommend reviewing the privacy policies of any ad networks displayed on this site.
        </Section>

        <Section title="Third-party libraries">
          Our tools use open-source libraries (jsPDF, pdf-lib, pdfjs-dist, mammoth, etc.) that run entirely in your browser. None of these libraries transmit your file data to external servers.
        </Section>

        <Section title="Children's privacy">
          SmartConverter is not directed at children under 13. We do not knowingly collect any information from children.
        </Section>

        <Section title="Changes to this policy">
          We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of SmartConverter after changes constitutes acceptance of the updated policy.
        </Section>

        <Section title="Contact">
          Questions about this policy? Reach us at{" "}
          <a href="mailto:privacy@smartconverter.app" style={{ color: "var(--accent)" }}>
            privacy@smartconverter.app
          </a>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-semibold mb-2" style={{ color: "var(--foreground)" }}>{title}</h2>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{children}</p>
    </div>
  );
}
