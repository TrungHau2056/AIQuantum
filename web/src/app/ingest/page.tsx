import type { Metadata } from "next";
import { IngestWizard } from "@/components/onboarding/ingest-wizard";

export const metadata: Metadata = {
  title: "Nhập dữ liệu — CarbonPilot",
  description:
    "Wizard nhập dữ liệu doanh nghiệp cấp cơ sở: thông tin doanh nghiệp, cơ sở, dữ liệu hoạt động, hệ số phát thải, hạn ngạch & tín chỉ, phương án đầu tư xanh, kịch bản thị trường, ESG.",
};

export default function IngestPage() {
  return <IngestWizard />;
}
