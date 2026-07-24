# Project Context — CarbonPilot (AI-Quantum Challenge 2026)

This file is the faithful reference for the competition proposal. It is the "dig deeper" layer referenced by [CLAUDE.md](../CLAUDE.md). Preserve the legal document references and numbers verbatim when implementing domain logic.

- Competition: AI-Quantum Challenge 2026 — Cuộc thi Trí tuệ nhân tạo và Lượng tử trong Kinh tế - Tài chính - Kế toán lần thứ I (Vòng 1)
- Solution name: **CarbonPilot**
- Domain: Vietnam carbon market / ETS compliance decision-support

---

## Part I. Team info (template — to be filled)

- Mã đội / Tên đội / Tên đề tài: _to fill_
- Lĩnh vực: ☐ Kinh tế ☐ Tài chính ☐ Kế toán ☐ Liên ngành
- Nhóm chủ đề: ☐ AI cho Phân tích Kinh tế vĩ mô ☐ AI cho Dịch vụ Tài chính thông minh ☐ AI cho Quản trị Rủi ro và Tuân thủ ☐ Quantum Computing cho Tài chính ☐ AI cho Chính sách công ☐ AI cho Giáo dục tài chính ☐ Khác
- Thành viên (Hậu, Vinh referenced in appendix): _to fill — STT, Họ tên, Ngành học, Trường, CCCD, Email, Điện thoại, Vai trò_

---

## Part II. Executive Summary

1. **Tên ý tưởng**: CarbonPilot — nền tảng hỗ trợ quyết định tuân thủ và tài chính carbon.
2. **Bài toán**: Tích hợp và chuẩn hóa dữ liệu phát thải/hạn ngạch/tín chỉ carbon đang phân tán để doanh nghiệp ra quyết định tuân thủ tối ưu; giúp ngân hàng, nhà đầu tư, cơ quan quản lý dựa trên dữ liệu minh bạch.
3. **Giải pháp**: Nền tảng chuyển dữ liệu phân tán thành dự báo, cảnh báo và khuyến nghị hành động; kết hợp AI (chuẩn hóa/dự báo/anomaly) + tối ưu hóa (MILP/QUBO quantum-inspired) + LLM local (diễn giải/báo cáo).
4. **Giá trị**: Giảm chi phí tuân thủ, tăng khả năng tiếp cận vốn xanh, thúc đẩy Net Zero 2050.
5. **Công nghệ**: AI/ML, NLP/LLM (local), Quantum-inspired Optimization (MILP, QUBO, Simulated Annealing).

---

## Part III. Mô tả bài toán thực tiễn (Tiêu chí 1 — 25%)

### 1. Bối cảnh
- COP26: Việt Nam cam kết Net Zero 2050; ước tính cần ~6.8% GDP/năm (~368 tỷ USD lũy kế đến 2040), khoảng một nửa từ khu vực tư nhân.
- Khung pháp lý thị trường carbon (từ đầu 2025):
  - Quyết định 13/2024/QĐ-TTg — danh mục >2000 cơ sở phải kiểm kê khí nhà kính (~30% phát thải quốc gia).
  - Nghị định 119/2025/NĐ-CP — sửa đổi/bổ sung quy định giảm nhẹ phát thải khí nhà kính.
  - Quyết định 263/QĐ-TTg — phê duyệt tổng hạn ngạch phát thải thí điểm 2025–2026.
  - Quyết định 699/QĐ-BNNMT — phân bổ hạn ngạch thí điểm cho 110 cơ sở (nhiệt điện, sắt thép, xi măng).
  - Nghị định 29/2026/NĐ-CP — thiết lập Sàn giao dịch carbon trong nước.
  - Thông tư 11/2026/TT-BNNMT — quản lý, vận hành Hệ thống đăng ký quốc gia về hạn ngạch phát thải và tín chỉ carbon.
  - Quyết định 21/2025/QĐ-TTg — Taxonomy Xanh (dùng cho thẩm định tín dụng xanh / phân loại hoạt động xanh).
  - 2026-06-29: Sàn giao dịch carbon trong nước chính thức khai trương.
- Khoảng trống: hạ tầng khớp lệnh/thanh toán đã hình thành, nhưng hạ tầng ra quyết định (thu thập, chuẩn hóa dữ liệu phát thải, lựa chọn phương án tài chính tối ưu) còn thiếu vắng cho doanh nghiệp, ngân hàng, nhà đầu tư.

### 2. Vấn đề cụ thể
- Vấn đề cốt lõi: chưa chuyển dữ liệu phát thải thành quyết định tối ưu, trong khi tuân thủ trở nên cấp bách và bắt buộc.
- Dữ liệu doanh nghiệp có (sản lượng, tiêu thụ năng lượng, nhiên liệu, phát thải, hạn ngạch) quản lý rời rạc, chỉ dùng cho báo cáo, chưa hỗ trợ ra quyết định.
- Tổng hạn ngạch phân bổ cho 3 ngành được thiết kế **thấp hơn** phát thải thực tế dự kiến 2025–2026 → phần lớn doanh nghiệp chắc chắn thiếu hụt hạn ngạch ngay từ đầu.
- Các phương án tuân thủ (mỗi phương án có chi phí, hiệu quả, thời gian hoàn vốn, rủi ro khác nhau):
  - Đầu tư công nghệ giảm phát thải
  - Mua thêm hạn ngạch
  - Sử dụng tín chỉ carbon bù trừ (tối đa 30% nghĩa vụ nộp trả)
  - Vay trước tối đa 15% hạn ngạch giai đoạn kế tiếp
- Chịu tác động bởi biến động giá carbon và quy định thị trường (giới hạn bù trừ, nguy cơ khấu trừ hạn ngạch kỳ sau nếu không hoàn thành).
- Hiện doanh nghiệp đánh giá bằng bảng tính/kin nghiệm, thiếu công cụ mô phỏng kịch bản, dự báo, khuyến nghị tối ưu.
- Đối tượng trực tiếp: 110 cơ sở thuộc 3 ngành — nhiệt điện (34), sắt thép (25), xi măng (51) — theo QĐ 263 và QĐ 699; tổng hạn ngạch >511 triệu tCO₂e (243,08 triệu năm 2025; 268,39 triệu năm 2026); nộp trả hạn ngạch trước 31/12/2027.
- Đối tượng gián tiếp: doanh nghiệp xuất khẩu (đặc biệt thép) chịu CBAM; ngân hàng, nhà đầu tư, cơ quan quản lý cần thông tin carbon đã chuẩn hóa.
- Tác động tài chính lớn: bù trừ 30% bằng tín chỉ có thể giảm tổng chi phí tuân thủ 3 ngành từ ~420,5 triệu USD xuống 68,9 triệu USD.

### 3. Minh chứng
| Nội dung | Giá trị | Nguồn | Ý nghĩa |
|---|---|---|---|
| ETS VN bước vào thí điểm | Thí điểm 2025–2026, vận hành sàn từ 2025 | ND 06/2022; ND 119/2025; QĐ 232 | Bài toán đã phát sinh thực tế |
| Nhiều doanh nghiệp bắt buộc tham gia ETS | 110 cơ sở (34+25+51); >511 triệu tCO₂e 2025–2026 | QĐ 263; QĐ 699 | Quy mô đối tượng lớn |
| Hạn ngạch thấp hơn phát thải dự kiến | Tổng hạn ngạch < tổng phát thải dự kiến 3 ngành | Phương án phân bổ BNNMT | Doanh nghiệp phải chọn phương án tuân thủ ngay từ đầu |
| Carbon là chi phí tài chính, quyết định tạo chênh lệch lớn | Bù trừ 30% giảm chi phí từ ~420,5M → 68,9M USD | Nghiên cứu Impact Assessment ETS (Vietnam News) | Cần công cụ đánh giá/lựa chọn phương án |
| Ra quyết định dưới nhiều ràng buộc | Bù trừ tối đa 30%, vay tối đa 15% kỳ sau; giá theo cung cầu | ND 119/2025 | Cần mô phỏng nhiều kịch bản đồng thời |

### 4. Phát biểu bài toán
Làm thế nào để tích hợp và chuẩn hóa các dữ liệu phân tán liên quan đến phát thải khí nhà kính, hạn ngạch và tín chỉ carbon nhằm giúp doanh nghiệp đưa ra các quyết định tối ưu và giúp nhà đầu tư, ngân hàng, cơ quan quản lý dựa trên dữ liệu minh bạch, tin cậy, góp phần thúc đẩy lộ trình Net Zero 2050 của Việt Nam.

---

## Part IV. Giá trị ứng dụng và sự cần thiết (Tiêu chí 2 — 20%)

### 1. Tầm quan trọng
- 2.166 cơ sở phải kiểm kê khí nhà kính (QĐ 13/2024) → quy mô nhu cầu quản lý dữ liệu carbon mở rộng.
- Dữ liệu carbon/ESG không chỉ phục vụ tuân thủ mà là cơ sở ra quyết định chiến lược (dự báo nhu cầu hạn ngạch, lựa chọn mua tín chỉ/đầu tư công nghệ).
- Ngân hàng/nhà đầu tư cần dữ liệu kiểm chứng để triển khai tài chính xanh. Cơ quan quản lý cần dữ liệu minh bạch để giám sát thị trường, thúc đẩy Net Zero 2050.

### 2. Tính cấp thiết
- Sàn giao dịch carbon đi vào vận hành cuối 6/2026 → chuyển từ quản lý phát thải sang cơ chế thị trường.
- Nếu không sớm xây dựng nền tảng dữ liệu thống nhất: doanh nghiệp khó tuân thủ/tối ưu; ngân hàng/nhà đầu tư mất thời gian thẩm định; cơ quan quản lý khó giám sát.

### 3. Lợi ích kỳ vọng
- **Doanh nghiệp**: tối ưu chi phí tuân thủ; dự báo thiếu/dư hạn ngạch; hỗ trợ quyết định chiến lược (mua tín chỉ, đầu tư công nghệ xanh, chuyển đổi năng lượng); nâng cao khả năng tiếp cận vốn xanh.
- **Nhà đầu tư**: tiết kiệm thời gian thu thập/phân tích ESG; đánh giá rủi ro carbon; cơ sở dữ liệu minh bạch kiểm chứng; nâng cao hiệu quả phân bổ vốn.
- **Ngân hàng**: rút ngắn thời gian thẩm định tín dụng xanh; đánh giá rủi ro ESG; hồ sơ carbon truy xuất được; xây dựng danh mục tín dụng xanh.
- **Cơ quan quản lý**: quản lý dữ liệu phát thải tập trung; giám sát tuân thủ, phát hiện bất thường; cơ sở dữ liệu truy xuất nguồn gốc; nâng cao minh bạch thị trường.

### 4. Tác động dự kiến
- **Kinh tế**: tối ưu chi phí tuân thủ; tăng hiệu quả phân bổ vốn xanh; giảm chi phí cơ hội/rủi ro; nâng cao năng lực cạnh tranh quốc tế (CBAM).
- **Xã hội**: thúc đẩy chuyển đổi xanh/Net Zero 2050; tăng nhận thức quản trị carbon; tạo việc làm chất lượng cao; giảm bất bình đẳng tiếp cận vốn xanh.
- **Công nghệ**: lớp hạ tầng dữ liệu carbon quốc gia đầu tiên kết hợp AI + quantum-inspired; mô hình Carbon Compliance cấp cơ sở mở rộng; đẩy mạnh AI+Quantum trong tài chính/môi trường; thiết lập tiêu chuẩn dữ liệu và audit trail (evidence vault) nền tảng MRV.

---

## Part V. Ý tưởng giải pháp (Tiêu chí 3 — 20%)

### 1. Mô tả tổng quan
CarbonPilot: nền tảng giúp doanh nghiệp chuẩn hóa dữ liệu carbon phân tán và lựa chọn phương án tuân thủ/giảm phát thải phù hợp. Chuyển dữ liệu (phát thải, hạn ngạch, tín chỉ, sản lượng, ngân sách, phương án đầu tư) thành dự báo, cảnh báo, khuyến nghị hành động.

- **Carbon Compliance Model** cấp cơ sở/nhà máy: dự báo phát thải cuối kỳ, xác định dư/thiếu hạn ngạch.
- Đánh giá phương án: dùng tín chỉ hiện có, mua tín chỉ/hạn ngạch, chuyển đổi nhiên liệu, tối ưu vận hành, đầu tư công nghệ giảm phát thải.
- So sánh theo: tổng chi phí vòng đời, chi phí trên mỗi tCO₂e giảm/bù trừ, thời gian triển khai, mức giảm phát thải thực tế, rủi ro tuân thủ. Dự án đầu tư thêm: NPV, IRR, ROI, thời gian hoàn vốn.
- **LLM local** tổng hợp, cá nhân hóa trình bày, giải thích phương án. Các phép tính định lượng/tối ưu do công thức, Policy Rule Engine, Optimization Engine đảm bảo chính xác và kiểm chứng.

### 2. Công nghệ và mục đích sử dụng

**2.1. Nền tảng dữ liệu carbon**
- PostgreSQL: doanh nghiệp, cơ sở sản xuất, sản lượng, phát thải, hạn ngạch, tín chỉ, giá thị trường, phương án công nghệ, ESG.
- MinIO/lưu trữ nội bộ: báo cáo, tài liệu bằng chứng.
- Mỗi dữ liệu gắn: nguồn, thời gian cập nhật, đơn vị đo, trạng thái xác minh.

**2.2. Xử lý và kiểm tra dữ liệu** (Python, Polars/Pandas, Pydantic)
- Ánh xạ trường từ Excel/CSV/biểu mẫu nội bộ về cấu trúc thống nhất.
- Chuẩn hóa mã cơ sở, kỳ báo cáo, loại hoạt động, đơn vị đo, hệ số quy đổi.
- Lưu đồng thời giá trị gốc, giá trị sau chuẩn hóa, nguồn dữ liệu, chứng từ.
- Kiểm tra: dữ liệu thiếu, trùng chứng từ, sai định dạng, sai đơn vị, ngoài phạm vi.
- Đối chiếu tổng tháng/quý/năm; đối chiếu sản lượng–tiêu thụ năng lượng–phát thải.
- Phát hiện thay đổi bất thường (cường độ phát thải, nhiên liệu, sản lượng).
- Gắn trạng thái xác minh + điểm chất lượng dữ liệu cho từng bản ghi.
- Báo cáo ESG/tài liệu phi cấu trúc: OCR + LLM local trích xuất, lưu kèm vị trí và tài liệu nguồn; người dùng đối chiếu/xác nhận/chỉnh sửa trước khi vào phân tích.

**2.3. Mô hình ngôn ngữ triển khai local**
- Mô hình mã nguồn mở ~4B–9B tham số, lượng tử hóa, chạy hạ tầng nội bộ.
- Mục đích: tổng hợp hồ sơ carbon; mô tả điều kiện áp dụng/rủi ro; nhóm và diễn giải phương án ứng viên; giải thích dự báo/tối ưu; sinh báo cáo; chatbot tư vấn.
- **Không tự tạo số liệu tài chính, hiệu quả giảm phát thải, hoặc quy định pháp luật** — phải lấy từ nguồn đã kiểm chứng.

**2.4. Kho công nghệ giảm phát thải và RAG (Technology Abatement Catalogue)**
- Lưu: ngành/quy trình áp dụng, điều kiện kỹ thuật, CAPEX, OPEX, chi phí bảo trì, lượng phát thải giảm dự kiến, thời gian triển khai, tuổi thọ, công suất tối đa, rủi ro, tác động ESG, nguồn dữ liệu, mức tin cậy.
- Retrieval lọc công nghệ phù hợp ngành, quy mô, ngân sách, điều kiện doanh nghiệp.

**2.5. Policy Rule Engine**
- Mỗi quy tắc lưu: văn bản nguồn, điều/khoản, ngày hiệu lực, ngày hết hiệu lực, đối tượng áp dụng, người kiểm tra nội dung. Kết quả = cảnh báo/kiểm tra điều kiện tuân thủ, không phải kết luận pháp lý.
- Mục đích: xác định nghĩa vụ tuân thủ; tính lượng tín chỉ tối đa; kiểm tra loại tín chỉ đủ điều kiện; cảnh báo thiếu hạn ngạch; kiểm tra phương án vi phạm.

**2.6. Dự báo phát thải và hạn ngạch**
- Giai đoạn đầu: phát thải cuối kỳ dự báo theo phát thải thực tế lũy kế + sản lượng kế hoạch còn lại + hệ số phát thải + lượng giảm từ biện pháp đã triển khai.
- Khi đủ dữ liệu lịch sử: bổ sung XGBoost / LightGBM / Quantile Regression → kịch bản phát thải thấp/cơ sở/cao.

**2.7. Tối ưu phương án**
- Mô hình hóa bằng **Mixed-Integer Linear Programming (MILP)** — Pyomo + solver HiGHS.
- Bộ tối ưu quyết định: công nghệ lựa chọn, tỷ lệ công suất, lượng tín chỉ sử dụng, lượng hạn ngạch cần mua, thời điểm triển khai, ngân sách theo kỳ.
- Mục tiêu: tối thiểu tổng chi phí đầu tư/vận hành/tuân thủ, đáp ứng ràng buộc pháp luật, ngân sách, tiến độ, sản lượng.

**2.8. Thử nghiệm QUBO và tối ưu Quantum-inspired**
- Phần lựa chọn có/không từng công nghệ biểu diễn dạng QUBO.
- Prototype: ưu tiên **Simulated Annealing** trên máy tính thường để giải QUBO. QAOA trên simulator chỉ thử nghiệm mở rộng nếu thời gian cho phép.
- So sánh với MILP về chi phí, thời gian tính toán, mức độ đáp ứng ràng buộc. **MILP là kết quả chuẩn trong prototype.**

**2.9. Phân tích What-if và tài chính**
- Mua tín chỉ/hạn ngạch: tổng chi phí tuân thủ, giá bình quân/tCO₂e, độ nhạy theo giá.
- Dự án công nghệ: CAPEX, OPEX, NPV, IRR, ROI, thời gian hoàn vốn.
- Phương án giảm phát thải: chi phí giảm bình quân, chi phí giảm biên.
- Phương án kết hợp: tổng chi phí vòng đời, trạng thái tuân thủ, lượng phát thải thực tế giảm.
- Scenario Engine mô phỏng biến động giá carbon, sản lượng, chi phí đầu tư, hiệu quả công nghệ → xác định ngưỡng giá mua tín chỉ/hạn ngạch/đầu tư công nghệ.

**2.10. Dashboard và phân quyền**
- Doanh nghiệp là trung tâm: chủ sở hữu dữ liệu, nhập/xác nhận, dùng dự báo/phân tích/tối ưu, ra quyết định cuối.
- Ngân hàng/nhà đầu tư/thẩm định/cơ quan quản lý: không mặc định truy cập dữ liệu nội bộ; chỉ xem chỉ số/hồ sơ/báo cáo doanh nghiệp chủ động chia sẻ hoặc dữ liệu nghĩa vụ báo cáo.
- Phân biệt dữ liệu nội bộ / chỉ số dẫn xuất / hồ sơ chia sẻ. Quyền theo người dùng, mục đích, phạm vi, thời gian; mọi xem/tải/chia sẻ ghi nhật ký kiểm toán.

### 3. Quy trình xử lý (8 bước)
1. **Thu thập dữ liệu**: nhập trực tiếp hoặc tải Excel/CSV/tài liệu (phát thải, hạn ngạch, tín chỉ, sản lượng, ngân sách, phương án đầu tư, ESG).
2. **Kiểm tra và chuẩn hóa**: kiểm tra định dạng/đơn vị/thiếu/trùng/bất thường trước khi lưu Carbon Data Ledger; trường tự động ánh xạ hiển thị để xác nhận; chỉ dữ liệu đã xác nhận/đủ độ tin cậy chuyển sang tính toán.
3. **Xây dựng hồ sơ carbon**: tổng hợp cấp doanh nghiệp và cấp cơ sở (phát thải, cường độ phát thải, hạn ngạch, tín chỉ, ngân sách, ràng buộc kỹ thuật).
4. **Dự báo và đánh giá tuân thủ**: Forecasting Engine dự báo phát thải cuối kỳ; Policy Rule Engine tính thiếu/dư hạn ngạch, giới hạn tín chỉ, rủi ro tuân thủ.
5. **Tạo phương án ứng viên**: Retrieval Engine lọc công nghệ đủ điều kiện; Scenario Engine kết hợp công nghệ + tín chỉ + hạn ngạch + điều chỉnh vận hành → phương án ứng viên có cấu trúc; LLM local chỉ đặt tên/nhóm/giải thích.
6. **Tính toán và tối ưu**: Calculation Engine tính CAPEX/OPEX/giảm phát thải/tổng chi phí vòng đời (+NPV/IRR/ROI/hoàn vốn cho dự án); Optimization Engine chọn tổ hợp đáp ứng quy định/ngân sách với tổng chi phí phù hợp nhất.
7. **Phân tích kịch bản**: chạy kịch bản giá carbon/sản lượng/hiệu quả công nghệ → kiểm tra ổn định khuyến nghị, xác định ngưỡng giá quyết định.
8. **Sinh báo cáo và chia sẻ**: doanh nghiệp kiểm tra, lựa chọn phương án, quyết định chỉ số/tài liệu chia sẻ; bên ngoài chỉ xem nội dung doanh nghiệp phê duyệt hoặc dữ liệu nghĩa vụ báo cáo.

### 4. Tại sao chọn công nghệ này?
- **Phù hợp**: ML cho dự báo/anomaly; Rule Engine cho tuân thủ; MILP cho tối ưu chi phí; QUBO/Quantum-inspired cho lựa chọn tổ hợp (sau MILP); LLM cho tổng hợp/diễn giải.
- **Tốt hơn thủ công**: bảng tính khó quản lý dữ liệu phân tán, dễ bỏ sót quy định, khó đánh giá đồng thời nhiều tổ hợp. Giải pháp tự động hóa chuẩn hóa/dự báo/kiểm tra/tính toán/tối ưu/báo cáo; kết quả tái lập, truy xuất, cập nhật nhanh.
- **Khả thi**: công nghệ mã nguồn mở (Python, PostgreSQL, FastAPI, Pyomo, HiGHS, LLM local). Prototype tập trung 1 cơ sở xi măng, 1 kỳ tuân thủ, dữ liệu tháng, 5–10 phương án công nghệ/hành động. LLM local tối ưu cho phần cứng phổ thông; dữ liệu nhạy cảm xử lý nội bộ, không gửi API AI công cộng.

### 5. Kết quả đầu ra dự kiến
- **Doanh nghiệp**: dự báo phát thải/dư-thiếu hạn ngạch; cảnh báo vượt hạn ngạch; bảng so sánh tổng chi phí vòng đời/tCO₂e giảm/ thời gian/rủi ro (+NPV/IRR/ROI/hoàn vốn); khuyến nghị tổ hợp tối ưu; what-if theo giá carbon; lộ trình giảm phát thải + hồ sơ thẩm định vốn xanh; báo cáo tự động + chatbot.
- **Ngân hàng/nhà đầu tư**: hồ sơ tóm tắt phát thải/trạng thái tuân thủ (doanh nghiệp chia sẻ); xu hướng phát thải/cường độ theo kỳ; danh mục dự án xanh/nhu cầu vốn/chỉ số tài chính; mức độ đầy đủ/truy xuất/xác minh dữ liệu; tiến độ mục tiêu giảm phát thải; tài liệu/chỉ số thẩm định (không phải điểm tín dụng/khuyến nghị cho vay tự động).
- **Cơ quan quản lý (hướng mở rộng)**: tổng hợp phát thải/hạn ngách/nhu cầu mua-bán theo ngành/địa phương; tỷ lệ đáp ứng/thiếu/nguy cơ vượt; xu hướng giảm phát thải/đầu tư chuyển đổi; tỷ lệ có báo cáo ESG/cam kết Net Zero; báo cáo cảnh báo tuân thủ phân quyền.

---

## Part VI. Dữ liệu dự kiến (Tiêu chí 4 — 15%) — template
- Nguồn dữ liệu (công khai/có thể truy cập): _to fill_
- Quy mô (số bản ghi, thời gian, dung lượng): _to fill_
- Tính hợp pháp: cam kết không vi phạm bản quyền, không sử dụng dữ liệu cá nhân trái phép, nguồn gốc rõ ràng.
- Mức độ sẵn sàng (đã tiếp cận/có thể thu thập/đang khảo sát): _to fill_

---

## Part VII. Tính sáng tạo và khác biệt (Tiêu chí 5 — 10%)

### 1. Các giải pháp hiện có
- **Persefoni**: nền tảng kế toán carbon AI (sổ cái carbon truy xuất/kiểm toán); tự thu thập từ ERP/hóa đơn; AI phát hiện bất thường, chọn hệ số; tính Scope 1/2/3 theo GHG Protocol; Data Lineage; báo cáo ISSB/TCFD/CDP/CSRD/SB 253/261; Scope 3 Data Exchange; Net Zero Navigator (với Bain); SOC 2/ISO 27001/ISO 42001. **Hạn chế**: chưa hỗ trợ tối ưu quyết định giữa mua tín chỉ/hạn ngạch/đầu tư công nghệ/điện xanh.
- **Watershed**: nền tảng trên CEDA + dữ liệu nội bộ; đo Scope 1/2/3 truy xuất; API + AI làm sạch; báo cáo CSRD/ISSB/CDP/GRI; Emission Hotspots; SBTi; kết nối dự án tín chỉ/năng lượng sạch; quản lý chuỗi cung ứng Scope 3. **Hạn chế**: chưa chuyên biệt bối cảnh VN (hạn ngạch theo cơ sở QĐ 699, dự báo nộp, cơ chế giao nộp); chưa tích hợp tối ưu đa mục tiêu (chi phí/ngân sách/pháp lý).
- **Normative**: kế toán carbon định hướng khoa học; thư viện 300.000+ hệ số (TÜV SÜD xác nhận ISO/IEC 25051, GHG Protocol); Scope 1/2/3 + FLAG; Carbon Network; dấu chân carbon sản phẩm (CBAM); chuyên gia riêng; SBTi/CSRD/CBAM. **Hạn chế**: tập trung kiểm kê/báo cáo/kế hoạch, chưa có lớp hỗ trợ ra quyết định tối ưu dưới ràng buộc (hạn ngạch, ngân sách xanh, pháp lý VN).

### 2. Điểm mới của nhóm
1. **Định vị là hạ tầng hỗ trợ quyết định về tài chính xanh và carbon** — lớp hỗ trợ ra quyết định, không chỉ kế toán carbon.
2. **Carbon Compliance Model cấp cơ sở với dữ liệu tập trung** — mô phỏng carbon toàn diện cho từng nhà máy, liên kết vận hành (sản lượng, nhiên liệu, điện) + phát thải + hạn ngạch + tín chỉ + dự án xanh; tính thiếu/dư, dự báo compliance gap, mô phỏng kịch bản, theo dõi lineage ở cấp chi tiết (đặc biệt QĐ 699 cho 110 cơ sở).
3. **Tích hợp AI + Quantum-inspired Optimization** — AI chuẩn hóa/tạo đầu vào sạch, quantum-inspired (MILP/QUBO) giải bài toán tổ hợp: mua tín chỉ/hạn ngạch, dùng tín chỉ hiện có, đầu tư công nghệ, mua điện xanh, kết hợp — dưới ràng buộc (ngân sách, thời gian, pháp lý, ESG, rủi ro giá). Khuyến nghị cụ thể kèm chi phí/tác động tCO₂e. **Đây là điểm khác biệt lớn nhất.**
4. **Nền tảng chia sẻ dữ liệu carbon phân quyền và cá nhân hóa đa đối tượng**.

### 3. Yếu tố AI/Quantum độc đáo (_to articulate_)
- AI mới ở đâu? _Quantum mới ở đâu? Sự kết hợp AI + Quantum khác biệt gì?_ — _to fill in proposal._

---

## Part VIII. Kế hoạch phát triển prototype (khuyến khích)
- Giai đoạn 1: Khảo sát và thu thập dữ liệu.
- Giai đoạn 2: Xây dựng mô hình.
- Giai đoạn 3: Phát triển prototype.
- Giai đoạn 4: Kiểm thử và hoàn thiện.

## Part IX. Sản phẩm dự kiến (khuyến khích)
☐ Dashboard ☐ Web App ☐ Mobile App ☐ Chatbot ☐ API ☐ Hệ hỗ trợ ra quyết định ☐ Khác

## Part X. Cam kết
Ý tưởng do nhóm tự đề xuất; không vi phạm bản quyền dữ liệu; chưa đạt giải cuộc thi tương đương; chấp hành thể lệ.

## Phụ lục
- **Phụ lục A**: Sơ đồ giải pháp (Hậu, Vinh).
- **Phụ lục B**: Nguồn dữ liệu.
- **Phụ lục C**: Tài liệu tham khảo.
