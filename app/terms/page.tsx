import { LegalPage } from "@/components/LegalPage";
import { termsContent } from "@/lib/legal-content";

export default function TermsPage() {
  return <LegalPage {...termsContent} />;
}
