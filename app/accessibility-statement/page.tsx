import { LegalPage } from "@/components/LegalPage";
import { accessibilityContent } from "@/lib/legal-content";

export default function AccessibilityStatementPage() {
  return <LegalPage {...accessibilityContent} />;
}
