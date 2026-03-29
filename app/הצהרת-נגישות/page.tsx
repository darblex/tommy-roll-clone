import { LegalPage } from "@/components/LegalPage";
import { accessibilityContent } from "@/lib/legal-content";

export default function AccessibilityPage() {
  return <LegalPage {...accessibilityContent} />;
}
