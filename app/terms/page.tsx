export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>Last updated: April 7, 2026</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Terms of Service</h1>
        <p style={{ color: "var(--muted)" }}>
          By using SmartConverter, you agree to the following terms. Please read them carefully.
        </p>
      </div>

      <div className="space-y-10">
        <Section title="Acceptance of terms">
          By accessing or using SmartConverter (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
        </Section>

        <Section title="Use of the service">
          SmartConverter provides free, browser-based file conversion tools. You may use the Service for personal or commercial purposes, provided you comply with these terms and all applicable laws. You must not use the Service to convert, process, or distribute illegal, harmful, or infringing content.
        </Section>

        <Section title="No warranty">
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied. We do not guarantee that conversions will be error-free, that the Service will be uninterrupted, or that output files will meet your specific requirements. Use the Service at your own risk.
        </Section>

        <Section title="Limitation of liability">
          To the fullest extent permitted by law, SmartConverter and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to loss of data, loss of profits, or business interruption.
        </Section>

        <Section title="Intellectual property">
          You retain full ownership of any files you convert using the Service. SmartConverter does not claim any rights over your content. The SmartConverter name, logo, and interface design are the property of their respective owners and may not be reproduced without permission.
        </Section>

        <Section title="Prohibited uses">
          You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to reverse-engineer, scrape, or overload the Service; (c) use automated tools to abuse or circumvent rate limits; (d) distribute malware or harmful files through the Service.
        </Section>

        <Section title="Advertisements">
          The Service is supported by third-party advertising. By using the Service, you acknowledge that ads may be displayed. Ad content is provided by third parties and does not constitute an endorsement by SmartConverter.
        </Section>

        <Section title="Third-party services">
          The Service may link to or rely on third-party libraries and services. We are not responsible for the content, privacy practices, or availability of any third-party services.
        </Section>

        <Section title="Modifications to the service">
          We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We are not liable to you or any third party for any such changes.
        </Section>

        <Section title="Changes to these terms">
          We may update these Terms from time to time. The date at the top of this page reflects the most recent revision. Continued use of the Service after changes constitutes your acceptance of the updated Terms.
        </Section>

        <Section title="Governing law">
          These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall be resolved in the appropriate courts of the applicable jurisdiction.
        </Section>

        <Section title="Contact">
          Questions about these Terms? Reach us at{" "}
          <a href="mailto:legal@smartconverter.app" style={{ color: "var(--accent)" }}>
            legal@smartconverter.app
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
