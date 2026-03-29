import { LegalPage } from "@/components/LegalPage";
import { privacyContent } from "@/lib/legal-content";

export default function PrivacyPolicyPage() {
  return <LegalPage {...privacyContent} />;
}
