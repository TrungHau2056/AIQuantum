# Project Context — CarbonPilot (AI-Quantum Challenge 2026)

Mẫu hồ sơ đề xuất ý tưởng và bài toán — Cuộc thi Trí tuệ nhân tạo và Lượng tử trong Kinh tế - Tài chính - Kế toán lần thứ I, năm 2026. File này là bản faithful (chi tiết, chính xác) được tham chiếu bởi [CLAUDE.md](../CLAUDE.md). Giữ nguyên các văn bản pháp lý và số liệu khi triển khai logic nghiệp vụ.

- **Tên đề tài**: AI + Quantum Carbon & Green Finance Decision Platform
- **Tên nội bộ (code)**: CarbonPilot
- **Cuộc thi**: AI-Quantum Challenge 2026 — Vòng 1
- **Domain**: Thị trường carbon Việt Nam / ETS compliance decision-support

> Ghi chú hoàn thiện hồ sơ: Các mục về mã đội, tên đội, CCCD và thông tin cá nhân thành viên để ở dạng `[Điền sau]`. Toàn bộ nội dung chuyên môn, bài toán, dữ liệu MVP, hướng giải và phụ lục đã điền sẵn.

---

## Phần I. Thông tin đội thi

| Mục | Thông tin |
|---|---|
| Mã đội | [Điền sau theo mã do Ban Tổ chức cấp] |
| Tên đội | [Điền tên đội] |
| Tên đề tài/ý tưởng | AI + Quantum Carbon & Green Finance Decision Platform |
| Lĩnh vực | ☒ Liên ngành ☒ Tài chính ☒ Kinh tế ☐ Kế toán |
| Nhóm chủ đề | ☒ AI cho Quản trị Rủi ro và Tuân thủ ☒ Quantum Computing cho Tài chính ☒ AI cho Dịch vụ Tài chính thông minh ☒ AI cho Chính sách công ☐ Khác |

### Thông tin thành viên

| STT | Họ tên | Ngành học | Trường | CCCD | Email | Điện thoại | Vai trò |
|---|---|---|---|---|---|---|---|
| 1 | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | Trưởng nhóm / Product Owner |
| 2 | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | AI & Data Lead |
| 3 | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | [Điền sau] | Finance & Carbon Market Analyst |

---

## Phần II. Tóm tắt ý tưởng (Executive Summary)

1. **Tên ý tưởng**: AI + Quantum Carbon & Green Finance Decision Platform (tên ngắn gọn khi trình bày: CarbonIQ Quantum hoặc GreenTwin Carbon).
2. **Bài toán cần giải quyết**: Việt Nam đã đặt mục tiêu phát thải ròng bằng 0 vào năm 2050 và đang hình thành thị trường carbon trong nước. Trong giai đoạn đầu, doanh nghiệp thuộc nhóm phát thải lớn phải kiểm kê khí nhà kính, quản lý hạn ngạch, nộp trả hạn ngạch và cân nhắc giao dịch tín chỉ carbon/hạn ngạch. Tuy nhiên, dữ liệu phát thải, sản xuất, năng lượng, ESG, hạn ngạch và tín chỉ carbon còn phân tán, thiếu chuẩn hóa và khó kiểm chứng, khiến doanh nghiệp khó ra quyết định nên mua tín chỉ, đầu tư công nghệ xanh hay kết hợp nhiều phương án.
3. **Giải pháp đề xuất**: Đề xuất xây dựng một nền tảng Decision Infrastructure cho carbon và tài chính xanh, không thay thế sàn giao dịch carbon mà bổ sung lớp dữ liệu và trí tuệ ra quyết định cho doanh nghiệp. Nền tảng dùng AI để thu thập, chuẩn hóa, kiểm tra chất lượng dữ liệu và tạo Carbon Digital Twin ở cấp cơ sở; sau đó dùng mô hình tối ưu quantum-inspired để đề xuất tổ hợp quyết định tối ưu: mua tín chỉ/hạn ngạch, dùng tín chỉ đang sở hữu, đầu tư công nghệ giảm phát thải, mua điện xanh hoặc kết hợp.
4. **Giá trị mang lại**: Giải pháp giúp doanh nghiệp giảm thời gian tổng hợp dữ liệu carbon, đánh giá trạng thái thiếu/dư hạn ngạch và mô phỏng chi phí tuân thủ trước khi giao dịch. Ngân hàng và nhà đầu tư có thể dùng Green Finance Profile được chuẩn hóa để thẩm định nhanh hơn các khoản vay/dự án xanh. Cơ quan quản lý có thêm lớp dữ liệu tổng hợp, truy vết và cảnh báo bất thường để điều hành thị trường minh bạch hơn.
5. **Công nghệ dự kiến**:

| Công nghệ | Mục đích sử dụng trong hệ thống |
|---|---|
| AI/ML | Tự động chuẩn hóa dữ liệu sản xuất, năng lượng, nhiên liệu; dự báo phát thải cuối kỳ; phát hiện bất thường trong dữ liệu. |
| NLP/LLM | Đọc báo cáo ESG, báo cáo kiểm kê khí nhà kính, hóa đơn điện/nhiên liệu và trích xuất các trường dữ liệu liên quan. |
| Data quality engine | Kiểm tra đơn vị đo, kỳ báo cáo, dữ liệu thiếu, trùng lặp, sai lệch bất thường; gắn điểm tin cậy dữ liệu. |
| Optimization / Quantum-inspired | Giải bài toán tối ưu tổ hợp giữa mua tín chỉ, dùng tín chỉ, đầu tư công nghệ, mua điện xanh dưới ràng buộc ngân sách, hạn ngạch, pháp lý và mục tiêu ESG. |
| Dashboard + API | Cung cấp giao diện cho doanh nghiệp, ngân hàng/nhà đầu tư và cơ quan quản lý; cho phép chia sẻ dữ liệu theo quyền. |

---

## Phần III. Mô tả bài toán thực tiễn (Tiêu chí 1 — 25%)

### 1. Bối cảnh

Tại COP26, Việt Nam đã đưa ra cam kết đạt phát thải ròng bằng 0 vào năm 2050. World Bank Group/IFC cũng nhấn mạnh Việt Nam cần huy động khu vực tư nhân và sử dụng dữ liệu, công cụ định lượng để ưu tiên các lựa chọn chuyển đổi xanh [R1].

Về khung pháp lý trong nước, Quyết định 13/2024/QĐ-TTg ban hành danh mục lĩnh vực, cơ sở phát thải khí nhà kính phải thực hiện kiểm kê [R2]. Quyết định 263/QĐ-TTg phê duyệt tổng hạn ngạch phát thải khí nhà kính thí điểm cho năm 2025-2026 [R3]. Bộ Nông nghiệp và Môi trường đã ban hành Quyết định 699/QĐ-BNNMT phân bổ hạn ngạch thí điểm cho 110 cơ sở thuộc các ngành nhiệt điện, xi măng và sắt thép [R4]. Cùng với đó, Nghị định 29/2026/NĐ-CP thiết lập sàn giao dịch các-bon trong nước [R5] và Thông tư 11/2026/TT-BNNMT quy định quản lý, vận hành Hệ thống đăng ký quốc gia [R6].

Trong bối cảnh đó, vấn đề không chỉ là tạo nơi mua bán tín chỉ carbon. Vấn đề lớn hơn là làm sao tạo được dữ liệu carbon đủ sạch, đủ chuẩn và đủ tin cậy để doanh nghiệp biết mình đang thiếu/dư hạn ngạch bao nhiêu, nên mua tín chỉ hay đầu tư giảm phát thải, và ngân hàng có thể dùng thông tin đó để thẩm định tín dụng xanh.

### 2. Vấn đề cụ thể

| Câu hỏi | Trả lời |
|---|---|
| Hiện đang có vấn đề gì? | Dữ liệu carbon của doanh nghiệp đang phân tán giữa hóa đơn điện, nhiên liệu, ERP, SCADA, báo cáo ESG, báo cáo môi trường và bảng tính nội bộ. Dữ liệu hạn ngạch/tín chỉ lại nằm ở registry, sàn/lưu ký hoặc hồ sơ giao dịch. Vì vậy, doanh nghiệp khó có một bức tranh thống nhất để ra quyết định. |
| Ai bị ảnh hưởng? | Doanh nghiệp phát thải lớn, ngân hàng cấp tín dụng xanh, nhà đầu tư ESG, cơ quan quản lý thị trường carbon và các đơn vị thẩm định/kiểm toán dữ liệu phát thải. |
| Mức độ ảnh hưởng? | Chi phí kiểm kê và lập báo cáo tăng; quyết định mua/bán tín chỉ thiếu cơ sở; ngân hàng mất thời gian thẩm định; cơ quan quản lý khó giám sát dữ liệu và nguy cơ phát sinh số liệu không đáng tin cậy. |
| Khoảng trống hiện nay? | Nhiều giải pháp hiện có tập trung vào carbon accounting, ESG reporting hoặc giao dịch tín chỉ. Khoảng trống là lớp mô phỏng và tối ưu quyết định giữa tuân thủ carbon và tài chính xanh. |

### 3. Minh chứng

| Nội dung | Giá trị | Nguồn dữ liệu | Ý nghĩa với bài toán |
|---|---|---|---|
| Cam kết khí hậu | Việt Nam đặt mục tiêu Net Zero 2050 và cần huy động khu vực tư nhân cho chuyển đổi xanh. | World Bank Group/IFC CCDR [R1] | Tạo nhu cầu dài hạn về đo lường, quản lý và tối ưu dữ liệu phát thải. |
| Đối tượng kiểm kê | Quyết định 13/2024/QĐ-TTg ban hành danh mục lĩnh vực, cơ sở phải kiểm kê khí nhà kính. | Cổng TTĐT Chính phủ [R2] | Tạo tập khách hàng mục tiêu cho MVP: các cơ sở phát thải lớn phải có dữ liệu kiểm kê. |
| Hạn ngạch thí điểm | Quyết định 263/QĐ-TTg phê duyệt tổng hạn ngạch phát thải khí nhà kính thí điểm cho năm 2025-2026. | Cổng TTĐT Chính phủ [R3] | Cho thấy bài toán đã chuyển từ báo cáo tự nguyện sang quản lý nghĩa vụ tuân thủ. |
| Phân bổ cấp cơ sở | Quyết định 699/QĐ-BNNMT áp dụng cho 110 cơ sở thuộc nhiệt điện, xi măng, sắt thép. | Cục Biến đổi khí hậu - Bộ NN&MT [R4] | MVP nên tập trung đúng 3 ngành này vì có nhu cầu tuân thủ và dữ liệu phát thải rõ nhất. |
| Hạ tầng thị trường | Nghị định 29/2026/NĐ-CP quy định sàn giao dịch các-bon trong nước; Thông tư 11/2026/TT-BNNMT quy định Hệ thống đăng ký quốc gia. | Cổng TTĐT Chính phủ [R5], [R6] | Nền tảng cần kết nối hoặc ít nhất mô phỏng được dữ liệu registry/sàn/lưu ký. |

### 4. Phát biểu bài toán

Làm thế nào để biến dữ liệu sản xuất, năng lượng, phát thải, hạn ngạch, tín chỉ carbon và ESG đang phân tán của doanh nghiệp thành một Carbon Digital Twin đủ tin cậy, nhằm giúp doanh nghiệp mô phỏng và lựa chọn phương án tuân thủ carbon tối ưu về chi phí, đồng thời tạo hồ sơ dữ liệu đủ chuẩn cho ngân hàng, nhà đầu tư và cơ quan quản lý?

---

## Phần IV. Giá trị ứng dụng và sự cần thiết (Tiêu chí 2 — 20%)

### 1. Tầm quan trọng

Bài toán ảnh hưởng trực tiếp tới doanh nghiệp phát thải lớn vì các đơn vị này cần kiểm kê khí nhà kính, quản lý hạn ngạch và chuẩn bị nghĩa vụ tuân thủ. Bài toán cũng ảnh hưởng tới ngân hàng/nhà đầu tư vì tín dụng xanh cần dữ liệu ESG và carbon có thể kiểm chứng; đồng thời ảnh hưởng tới cơ quan quản lý vì thị trường carbon chỉ vận hành minh bạch khi dữ liệu đầu vào đáng tin cậy.

### 2. Tính cấp thiết

- Thị trường carbon trong nước đã có khung pháp lý và đang đi vào giai đoạn vận hành thí điểm; doanh nghiệp cần công cụ chuẩn bị dữ liệu ngay từ sớm.
- Doanh nghiệp không thể ra quyết định chỉ dựa trên tổng lượng CO2 cuối kỳ; cần dự báo trước thiếu/dư hạn ngạch và so sánh chi phí giữa mua tín chỉ với đầu tư xanh.
- Tài chính xanh và taxonomy xanh yêu cầu dữ liệu có chứng cứ, có lineage và có khả năng kiểm tra; nếu không chuẩn hóa từ đầu, doanh nghiệp sẽ khó tiếp cận vốn xanh.
- Nếu không có hệ thống kiểm soát chất lượng dữ liệu, thị trường có thể gặp rủi ro số liệu không nhất quán, trùng lặp, sai đơn vị đo hoặc thiếu chứng từ nguồn.

### 3. Lợi ích kỳ vọng

| Đối tượng | Lợi ích |
|---|---|
| Người dùng trực tiếp trong doanh nghiệp | Giảm thời gian nhập liệu và tổng hợp báo cáo; biết ngay trạng thái thiếu/dư hạn ngạch; có kịch bản hành động rõ ràng trước kỳ nộp trả. |
| Doanh nghiệp | Tối ưu chi phí tuân thủ carbon; giảm rủi ro bị thiếu hạn ngạch; hỗ trợ lập kế hoạch đầu tư công nghệ xanh và xin vay xanh. |
| Ngân hàng/nhà đầu tư | Có Green Finance Profile gồm phát thải, trạng thái tuân thủ, dự án giảm phát thải, chứng từ nguồn và điểm tin cậy dữ liệu để rút ngắn thời gian thẩm định. |
| Cơ quan quản lý | Có dữ liệu tổng hợp theo ngành/địa phương, cảnh báo bất thường và audit trail để nâng cao tính minh bạch của thị trường carbon. |
| Xã hội | Thúc đẩy giảm phát thải thực chất thay vì chỉ mua bù trừ; tăng minh bạch trong chuyển đổi xanh. |

### 4. Tác động dự kiến

| Nhóm tác động | Mô tả |
|---|---|
| Kinh tế | Giúp doanh nghiệp so sánh chi phí mua tín chỉ, vay mượn hạn ngạch, đầu tư công nghệ xanh và mua điện xanh; giảm chi phí cơ hội do ra quyết định muộn hoặc thiếu dữ liệu. |
| Xã hội | Tăng năng lực tuân thủ và minh bạch hóa thông tin carbon; hỗ trợ mục tiêu Net Zero 2050. |
| Công nghệ | Tạo lớp dữ liệu carbon chuẩn hóa kết hợp AI, tối ưu tổ hợp và audit trail; có thể mở rộng sang API cho ngân hàng/nhà đầu tư. |

---

## Phần V. Ý tưởng giải pháp (Tiêu chí 3 — 20%)

### 1. Mô tả tổng quan

Hệ thống được định vị là Carbon & Green Finance Decision Infrastructure — lớp hạ tầng dữ liệu và ra quyết định nằm giữa doanh nghiệp, sàn giao dịch carbon, registry/lưu ký, ngân hàng, nhà đầu tư và cơ quan quản lý. Hệ thống không tạo thêm một sàn carbon mới, mà giúp các bên có dữ liệu tốt hơn trước và sau giao dịch.

MVP tập trung vào một use case hẹp nhưng giá trị cao: trợ lý tối ưu tuân thủ carbon cho doanh nghiệp có hạn ngạch. Doanh nghiệp upload hoặc nhập dữ liệu sản xuất, điện, nhiên liệu, phát thải, hạn ngạch, tín chỉ đang sở hữu và các phương án đầu tư xanh. Hệ thống tính trạng thái carbon, mô phỏng kịch bản và đưa ra khuyến nghị mua/đầu tư/kết hợp.

### 2. Công nghệ và mục đích sử dụng

| Thành phần | Công nghệ | Mục đích |
|---|---|---|
| Data ingestion | Parser XLSX/CSV/PDF, OCR chọn lọc, connector ERP/SCADA ở giai đoạn sau | Thu dữ liệu từ file doanh nghiệp, hóa đơn, báo cáo kiểm kê và báo cáo ESG. |
| Data quality | Rule-based validation + anomaly detection | Phát hiện sai đơn vị, thiếu tháng, trùng hóa đơn, lệch cường độ phát thải bất thường. |
| Emission engine | GHG Protocol/IPCC/local emission factors | Tính Scope 1, Scope 2 ở mức MVP; Scope 3 để giai đoạn sau. |
| AI/NLP | LLM + information extraction | Đọc báo cáo ESG/kiểm kê, trích mục tiêu Net Zero, phát thải, dự án giảm phát thải. |
| Forecast | Time-series ML/benchmarking | Dự báo phát thải cuối kỳ theo sản lượng, điện, nhiên liệu và kế hoạch sản xuất. |
| Optimization | MILP/QUBO/quantum-inspired optimization | Tối ưu tổ hợp mua tín chỉ, dùng tín chỉ, đầu tư xanh, mua điện xanh dưới các ràng buộc. |
| Governance | RBAC/ABAC, audit trail, evidence vault | Quản lý quyền chia sẻ dữ liệu cho ngân hàng, nhà đầu tư, verifier và cơ quan quản lý. |

### 3. Quy trình xử lý

1. Doanh nghiệp nhập/upload dữ liệu: sản lượng, điện, nhiên liệu, phát thải đã kiểm kê nếu có, hạn ngạch, tín chỉ, giá carbon giả định và phương án đầu tư xanh.
2. AI chuẩn hóa và kiểm tra chất lượng dữ liệu: đồng bộ đơn vị đo, kỳ báo cáo, nguồn chứng từ, độ đầy đủ và điểm tin cậy.
3. Emission engine tính phát thải hiện tại và dự báo BAU cuối kỳ.
4. Compliance engine tính chênh lệch hạn ngạch: phát thải dự báo − hạn ngạch − tín chỉ/hạn ngạch khả dụng.
5. Scenario engine sinh các kịch bản: mua tín chỉ, đầu tư công nghệ xanh, mua điện xanh, vay mượn/điều chuyển hạn ngạch nếu phù hợp, hoặc kết hợp.
6. Quantum-inspired optimizer chọn phương án có tổng chi phí thấp nhất hoặc điểm tổng hợp tốt nhất theo mục tiêu chi phí, tuân thủ, ESG và tài chính xanh.
7. Dashboard xuất khuyến nghị, cảnh báo rủi ro, báo cáo tuân thủ và Green Finance Profile.

### Ví dụ minh họa cho bài toán

| Input của doanh nghiệp xi măng A (synthetic data theo logic ngành) | Giá trị |
|---|---|
| Sản lượng xi măng/năm | 3.000.000 tấn |
| Phát thải dự báo BAU | 2.400.000 tCO₂e |
| Hạn ngạch được cấp | 2.200.000 tCO₂e |
| Thiếu hụt ban đầu | 200.000 tCO₂e |
| Tín chỉ carbon đang có | 50.000 tCO₂e |
| Giá tín chỉ/hạn ngạch giả định | 250.000 VND/tCO₂e |
| Ngân sách đầu tư xanh | 80 tỷ VND |
| Dự án ứng viên | Thu hồi nhiệt thải, CAPEX 70 tỷ VND, giảm 120.000 tCO₂e/năm, tiết kiệm điện 12 tỷ VND/năm |

Hướng giải của hệ thống:

- **Kịch bản 1 — Chỉ mua tín chỉ**: cần mua 150.000 tCO₂e sau khi dùng 50.000 tín chỉ sẵn có. Chi phí = 150.000 × 250.000 = 37,5 tỷ VND. Phương án này nhanh nhưng không giảm phát thải thật và không cải thiện nhiều hồ sơ tài chính xanh.
- **Kịch bản 2 — Chỉ đầu tư công nghệ**: dự án giảm 120.000 tCO₂e/năm nhưng vẫn thiếu 30.000 tCO₂e sau khi dùng tín chỉ đang có; năm đầu cần 70 tỷ CAPEX và vẫn cần mua thêm 7,5 tỷ VND tín chỉ. Phương án này có lợi dài hạn nếu xét tiết kiệm năng lượng và rủi ro giá carbon tăng.
- **Kịch bản 3 — Kết hợp**: dùng 50.000 tín chỉ đang có + đầu tư thu hồi nhiệt thải + mua thêm 30.000 tCO₂e. Đây là phương án cân bằng giữa tuân thủ ngắn hạn, giảm phát thải thật và cải thiện Green Finance Profile.

Hàm mục tiêu gợi ý:

```
Minimize Total Cost = Cost_credit + CAPEX + OPEX_delta − Energy_savings − Avoided_future_carbon_cost
```

Ràng buộc:

```
Emissions_after_actions <= Allowance + eligible_credits + other_allowed_mechanisms
CAPEX <= Budget
Offset/credit usage <= legal_limit(versioned policy rule)
Project_start_date, implementation_lag, project_lifetime are respected
```

### 4. Tại sao chọn công nghệ này?

| Luận điểm | Giải thích |
|---|---|
| Vì sao phù hợp? | Bài toán có dữ liệu đầu vào phân tán, nhiều file phi cấu trúc, nhiều nguồn và nhiều ràng buộc. AI phù hợp để chuẩn hóa và đọc dữ liệu; optimization phù hợp để chọn phương án hành động. |
| Vì sao tốt hơn cách thủ công? | Cách thủ công thường dừng ở kiểm kê và Excel scenario đơn giản. Hệ thống có thể tự động hóa kiểm tra dữ liệu, dự báo phát thải, chạy nhiều kịch bản và lưu lại audit trail. |
| Vì sao khả thi? | MVP không cần tích hợp toàn bộ thị trường ngay. Có thể bắt đầu bằng dữ liệu công khai + synthetic enterprise data + upload Excel/PDF; dùng quantum-inspired optimization trước, sau đó mở rộng sang quantum annealing/QAOA khi dữ liệu và bài toán đủ lớn. |

### 5. Kết quả đầu ra dự kiến

| Output | Mô tả |
|---|---|
| Carbon Digital Twin | Hồ sơ phát thải, hạn ngạch, tín chỉ, dữ liệu ESG và chứng từ nguồn của từng cơ sở. |
| Compliance Gap | Cảnh báo thiếu/dư hạn ngạch, lượng tín chỉ cần mua, rủi ro vượt hạn ngạch cuối kỳ. |
| Scenario Recommendation | Khuyến nghị mua tín chỉ, đầu tư công nghệ, mua điện xanh hoặc kết hợp; có chi phí và tác động tCO₂e. |
| Green Finance Profile | Hồ sơ chia sẻ với ngân hàng/nhà đầu tư gồm dữ liệu carbon, dự án xanh, NPV sơ bộ, điểm tin cậy dữ liệu. |
| Báo cáo tự động | Xuất báo cáo PDF/DOCX/Excel cho quản trị nội bộ, verifier, ngân hàng hoặc cơ quan quản lý theo quyền. |
| Chatbot tư vấn | Trả lời câu hỏi như: "Tôi thiếu bao nhiêu hạn ngạch?", "Nếu giá carbon tăng 20% thì phương án nào tốt hơn?", "Dự án này có hỗ trợ vay xanh không?" |

---

## Phần VI. Dữ liệu dự kiến (Tiêu chí 4 — 15%)

### 1. Nguồn dữ liệu

| Nguồn | Công khai | Có thể truy cập | Vai trò trong MVP |
|---|---|---|---|
| Văn bản pháp lý về kiểm kê, hạn ngạch, sàn giao dịch, registry | Có | Có | Làm source of truth cho policy rule engine và data dictionary: QĐ 13/2024, QĐ 263/QĐ-TTg, NĐ 29/2026, TT 11/2026, NĐ 119/2025. |
| Dữ liệu phân bổ hạn ngạch cấp cơ sở | Một phần | Có thể truy cập mức công bố; chi tiết đầy đủ cần quyền | Dùng để thiết kế mô hình dữ liệu allowance và mô phỏng doanh nghiệp có hạn ngạch. |
| Báo cáo ESG/báo cáo thường niên/báo cáo phát triển bền vững | Có với doanh nghiệp niêm yết | Có | Làm golden schema để trích xuất phát thải, năng lượng, mục tiêu ESG và dự án xanh. |
| Dữ liệu vận hành doanh nghiệp: điện, nhiên liệu, sản lượng | Không hoàn toàn | MVP dùng synthetic/mock; pilot cần doanh nghiệp cấp quyền | Dữ liệu lõi để tính phát thải và dự báo compliance gap. |
| Hệ số phát thải | Có | Có | GHG Protocol/IPCC/hệ số điện lưới và hệ số do cơ quan có thẩm quyền công bố để tính Scope 1, Scope 2. |
| Giá carbon, thanh khoản, lịch sử giao dịch | Một phần | Giai đoạn đầu dùng scenario/mock | Dùng để mô phỏng chi phí mua tín chỉ/hạn ngạch và phân tích độ nhạy. |
| Dữ liệu dự án đầu tư xanh | Một phần | Mock hoặc lấy từ báo giá/dự án mẫu | Dùng để tính CAPEX, OPEX, giảm tCO₂e, NPV, thời gian hoàn vốn. |

### 2. Quy mô dữ liệu

| Nội dung | Ước lượng cho MVP |
|---|---|
| Số doanh nghiệp demo | 10 doanh nghiệp synthetic: 4 xi măng, 3 nhiệt điện, 3 thép. |
| Số cơ sở/nhà máy | 10–20 cơ sở, mỗi cơ sở có dữ liệu theo tháng. |
| Thời gian dữ liệu | 12–24 tháng dữ liệu hoạt động; 3 kịch bản carbon price; 3–5 năm forecast tài chính cho dự án xanh. |
| Số bản ghi activity data | Khoảng 1.000–5.000 bản ghi ở MVP: điện, nhiên liệu, sản lượng, chi phí, chứng từ. |
| Số bản ghi scenario | Khoảng 300–1.000 bản ghi kịch bản: mua tín chỉ, đầu tư xanh, kết hợp, sensitivity. |
| Dung lượng | 50–300 MB nếu gồm PDF/Excel demo; phần dữ liệu bảng dưới 50 MB. |

### 3. Tính hợp pháp

- Không sử dụng dữ liệu cá nhân trái phép; thông tin CCCD/thành viên chỉ để trong hồ sơ đội thi, không đưa vào dữ liệu mô hình.
- Dữ liệu pháp lý và dữ liệu công khai được trích dẫn nguồn rõ ràng trong phụ lục tài liệu tham khảo.
- Dữ liệu doanh nghiệp dùng trong MVP là synthetic/mock data dựa trên cấu trúc dữ liệu thực tế, không gán cho một doanh nghiệp cụ thể nếu chưa có quyền sử dụng.
- Khi pilot với doanh nghiệp thật, hệ thống yêu cầu văn bản đồng ý chia sẻ dữ liệu, phân quyền truy cập và lưu audit trail.

### 4. Mức độ sẵn sàng

| Nhóm dữ liệu | Mức độ sẵn sàng | Ghi chú |
|---|---|---|
| Văn bản pháp lý | Đã tiếp cận | Có nguồn chính thống từ Cổng TTĐT Chính phủ, Bộ NN&MT. |
| Golden schema | Có thể xây ngay | Dựa trên mẫu báo cáo kiểm kê, cấu trúc registry, GHG Protocol và báo cáo ESG công khai. |
| Enterprise activity data | Mock có kiểm soát | MVP dùng synthetic data; pilot thay bằng hóa đơn điện, nhiên liệu, ERP/SCADA nếu có. |
| Market price | Scenario/mock | Do thị trường mới, dữ liệu giá công khai có thể chưa đủ dày; dùng low-base-high scenarios. |
| Registry/exchange API | Đang khảo sát | MVP thiết kế data model tương thích; tích hợp API/file secure ở giai đoạn sau. |

### 5. Minimum Data Model cho MVP

| Bảng dữ liệu | Trường dữ liệu tối thiểu | Mục đích |
|---|---|---|
| `company` | company_id, tax_id, name, sector, ownership_type | Nhận diện doanh nghiệp và phân ngành. |
| `facility` | facility_id, company_id, province, product_main, capacity | Quản lý dữ liệu ở cấp cơ sở/nhà máy. |
| `activity_data` | facility_id, month, activity_type, quantity, unit, evidence_id | Lưu điện, nhiên liệu, sản lượng, nguyên liệu. |
| `emission_factor` | factor_id, activity_type, factor_value, unit, source, version | Tính phát thải có version và nguồn rõ ràng. |
| `emissions` | facility_id, period, scope, emissions_tco2e, method, confidence_score | Lưu phát thải đã tính/đã kiểm kê. |
| `allowance_position` | facility_id, period, allocated_tco2e, balance_tco2e, surrender_deadline | Theo dõi hạn ngạch được cấp và trạng thái tuân thủ. |
| `carbon_credit` | credit_id, owner_id, type, vintage, volume_tco2e, status | Theo dõi tín chỉ đang có và khả năng sử dụng. |
| `market_scenario` | scenario_id, price_low, price_base, price_high, fee_rate | Mô phỏng chi phí mua/bán tín chỉ. |
| `green_project` | project_id, capex, opex_delta, abatement_tco2e_year, start_date, lifetime, taxonomy_match | Đánh giá phương án đầu tư xanh. |
| `decision_scenario` | scenario_id, actions, total_cost, emissions_after, compliance_status, npv | Kết quả mô phỏng và tối ưu. |
| `evidence_file` | evidence_id, file_name, source_type, hash, upload_time, approved_by | Evidence vault và audit trail. |

### 6. Chính sách dùng mock data

Mock data không làm sai bài toán nếu được dùng đúng mục đích: chứng minh luồng xử lý, data model, validation, mô phỏng và tối ưu quyết định. Mock data không được dùng để khẳng định doanh nghiệp thật sẽ tiết kiệm chính xác bao nhiêu tiền hay giảm chính xác bao nhiêu phát thải nếu chưa có dữ liệu được xác minh.

| Loại dữ liệu | Cách dùng trong MVP |
|---|---|
| Golden data thật | Dùng văn bản pháp lý, GHG Protocol, cấu trúc registry, báo cáo công khai và mẫu kiểm kê để xây data dictionary. |
| Synthetic enterprise data | Sinh 10–20 doanh nghiệp mô phỏng theo ngành xi măng/thép/nhiệt điện; đảm bảo quan hệ logic giữa sản lượng, điện, nhiên liệu và phát thải. |
| Mock market data | Tạo 3 scenario giá carbon: thấp, cơ sở, cao; không tuyên bố là giá giao dịch thực tế. |
| Mock investment data | Tạo 1–3 dự án giảm phát thải/cơ sở, với CAPEX, OPEX, mức giảm tCO₂e, thời gian triển khai, tuổi thọ. |

---

## Phần VII. Tính sáng tạo và khác biệt (Tiêu chí 5 — 10%)

### 1. Các giải pháp hiện có

| Giải pháp | Hạn chế so với bài toán đề xuất |
|---|---|
| Persefoni / Watershed | Mạnh về carbon accounting và báo cáo phát thải, nhưng chưa tập trung vào bài toán hạn ngạch Việt Nam, quyết định mua/bán tín chỉ và tối ưu tài chính xanh. |
| Microsoft Cloud for Sustainability / Salesforce Net Zero Cloud | Mạnh về quản trị dữ liệu ESG/carbon ở quy mô doanh nghiệp, nhưng không phải lớp tối ưu tuân thủ carbon cho ETS Việt Nam. |
| CCTPA / ASEAN Carbon Credit Exchange và các nền tảng giao dịch carbon | Tập trung vào giao dịch, MRV, tư vấn, phát triển dự án carbon; chưa thể hiện rõ chức năng tối ưu tổ hợp giữa hạn ngạch, tín chỉ, công nghệ xanh và green finance ở cấp cơ sở. |

### 2. Điểm mới của nhóm

- **Điểm mới 1**: Định vị không phải sàn carbon, mà là lớp Carbon Decision Intelligence đứng giữa doanh nghiệp, thị trường carbon và tài chính xanh.
- **Điểm mới 2**: Dùng Carbon Digital Twin ở cấp cơ sở để liên kết dữ liệu sản xuất, phát thải, hạn ngạch, tín chỉ, ESG, chi phí và chứng từ nguồn.
- **Điểm mới 3**: Tối ưu quyết định đa mục tiêu: chi phí tuân thủ, trạng thái hạn ngạch, rủi ro giá carbon, NPV dự án xanh và khả năng vay vốn xanh.

### 3. Yếu tố AI/Quantum độc đáo

| Yếu tố | Điểm độc đáo |
|---|---|
| AI mới ở đâu? | AI không chỉ đọc báo cáo ESG mà còn biến dữ liệu vận hành phân tán thành dữ liệu carbon chuẩn hóa, gắn chứng từ, điểm tin cậy và cảnh báo bất thường. |
| Quantum mới ở đâu? | Quantum-inspired optimization giải bài toán tổ hợp nhiều lựa chọn hành động với ràng buộc pháp lý, ngân sách, thời gian triển khai, giá carbon và mục tiêu ESG. |
| Kết hợp AI + Quantum khác biệt ở đâu? | AI tạo dữ liệu đầu vào đủ sạch; optimization/quantum-inspired tìm phương án hành động tốt nhất. Nếu chỉ có AI sẽ khó bảo đảm tối ưu; nếu chỉ có tối ưu mà dữ liệu bẩn thì kết quả không đáng tin. |

---

## Phần VIII. Kế hoạch phát triển prototype (Khuyến khích — thể hiện tiềm năng vào Vòng 2)

| Giai đoạn | Thời gian | Nội dung | Kết quả |
|---|---|---|---|
| Giai đoạn 1 — Khảo sát và thu thập dữ liệu | Tuần 1–2 | Chốt data dictionary, chọn 3 ngành MVP, thu văn bản pháp lý, xây golden schema, tạo synthetic data ban đầu. | Bộ dữ liệu MVP v0.1 và tài liệu yêu cầu. |
| Giai đoạn 2 — Xây dựng mô hình | Tuần 3–5 | Xây emission engine, data quality rules, forecast phát thải, scenario engine và mô hình tối ưu MILP/QUBO. | Model tính phát thải và khuyến nghị kịch bản. |
| Giai đoạn 3 — Phát triển prototype | Tuần 6–9 | Làm web dashboard, upload file, form nhập dự án xanh, kết quả compliance gap, khuyến nghị mua/đầu tư/kết hợp. | Prototype chạy được end-to-end. |
| Giai đoạn 4 — Kiểm thử và hoàn thiện | Tuần 10–12 | Kiểm thử với 10 doanh nghiệp synthetic, demo 3 ngành, kiểm tra độ nhạy giá carbon, hoàn thiện báo cáo và pitch deck. | MVP sẵn sàng cho Vòng 2. |

---

## Phần IX. Sản phẩm dự kiến

| Loại sản phẩm | Chọn | Mô tả |
|---|---|---|
| Dashboard | ☒ | Hiển thị phát thải, hạn ngạch, tín chỉ, trạng thái tuân thủ, kịch bản chi phí. |
| Web App | ☒ | Giao diện chính cho doanh nghiệp nhập dữ liệu, chạy mô phỏng và xuất báo cáo. |
| Mobile App | ☐ | Chưa ưu tiên ở MVP. |
| Chatbot | ☒ | Tư vấn truy vấn nhanh trên dữ liệu carbon và các kịch bản. |
| API | ☒ | Chia sẻ Green Finance Profile cho ngân hàng/nhà đầu tư theo quyền. |
| Hệ hỗ trợ ra quyết định | ☒ | Lõi sản phẩm: tối ưu mua tín chỉ/đầu tư/kết hợp. |
| Khác | ☒ | Evidence vault, audit trail, data quality score. |

---

## Phần X. Cam kết

Đội thi cam kết:

- Ý tưởng do nhóm tự đề xuất và phát triển trên cơ sở nghiên cứu bối cảnh thị trường carbon, hạn ngạch phát thải và tài chính xanh tại Việt Nam.
- Không vi phạm bản quyền dữ liệu; dữ liệu công khai được trích nguồn; dữ liệu doanh nghiệp trong MVP là synthetic/mock hoặc chỉ sử dụng khi có quyền hợp pháp.
- Không sử dụng dữ liệu cá nhân trái phép; không đưa dữ liệu CCCD, số điện thoại, email cá nhân vào dữ liệu huấn luyện/mô phỏng.
- Chưa đạt giải ở cuộc thi tương đương khác đối với cùng ý tưởng/sản phẩm ở cùng mức hoàn thiện.
- Chấp hành đầy đủ thể lệ cuộc thi AI-Quantum Challenge 2026.

Đại diện đội thi: .................................................. Ngày: ....../....../2026

---

## Phụ lục A. Sơ đồ giải pháp

```
Enterprise Data Sources
   |-- Excel/CSV: sản lượng, điện, nhiên liệu
   |-- PDF: hóa đơn, ESG report, báo cáo kiểm kê
   |-- ERP/SCADA/IoT: giai đoạn pilot
   |-- Registry/Exchange data: khi được cấp quyền
        |
        v
 AI Ingestion + Data Quality Engine
   |-- Chuẩn hóa đơn vị đo, kỳ báo cáo
   |-- Kiểm tra thiếu/trùng/sai lệch
   |-- Gắn evidence và confidence score
        |
        v
 Carbon Digital Twin by Facility
   |-- Activity data
   |-- Emissions Scope 1/2
   |-- Allowance position
   |-- Carbon credits
   |-- ESG/Green project profile
        |
        v
 Scenario + Quantum-inspired Optimization
   |-- Mua tín chỉ / hạn ngạch
   |-- Dùng tín chỉ đang có
   |-- Đầu tư công nghệ xanh
   |-- Mua điện xanh
   |-- Kết hợp nhiều phương án
        |
        v
 Outputs
   |-- Compliance dashboard
   |-- Decision recommendation
   |-- Green Finance Profile
   |-- Audit-ready report
```

## Phụ lục B. Nguồn dữ liệu

| Nhóm nguồn | Nguồn cụ thể | Ứng dụng trong sản phẩm |
|---|---|---|
| Pháp lý carbon | QĐ 13/2024/QĐ-TTg, QĐ 263/QĐ-TTg, QĐ 699/QĐ-BNNMT, NĐ 29/2026/NĐ-CP, TT 11/2026/TT-BNNMT, NĐ 119/2025/NĐ-CP | Rule engine, data dictionary, mô hình hạn ngạch/registry/sàn. |
| Chuẩn kiểm kê | GHG Protocol, IPCC, hệ số phát thải chính thức khi có | Emission calculation và phân loại Scope 1/2/3. |
| Tài chính xanh | QĐ 21/2025/QĐ-TTg về phân loại xanh; báo cáo World Bank/IFC | Green Finance Profile và đánh giá sơ bộ dự án xanh. |
| Dữ liệu doanh nghiệp | Synthetic/mock dựa trên cấu trúc báo cáo ESG, báo cáo kiểm kê, ĐTM và mẫu hóa đơn | Demo MVP và kiểm thử luồng dữ liệu. |
| Thị trường carbon | Scenario giá carbon thấp/cơ sở/cao; dữ liệu giao dịch thật khi được phép truy cập | Mô phỏng chi phí mua tín chỉ/hạn ngạch. |

## Phụ lục C. Tài liệu tham khảo

- **[R1]** World Bank Group/IFC, Vietnam Country Climate and Development Report (CCDR), 2022. https://www.ifc.org/content/dam/ifc/doc/mgrt/ccdr-vietnam-full-report-0107-final.pdf
- **[R2]** Quyết định 13/2024/QĐ-TTg: Danh mục lĩnh vực, cơ sở phát thải khí nhà kính phải kiểm kê. https://vanban.chinhphu.vn/?docid=210939&pageid=27160
- **[R3]** Quyết định 263/QĐ-TTg: Phê duyệt tổng hạn ngạch phát thải khí nhà kính thí điểm cho năm 2025-2026. https://vanban.chinhphu.vn/?docid=216923&pageid=27160
- **[R4]** Cục Biến đổi khí hậu - Bộ NN&MT: phân bổ hạn ngạch phát thải cụ thể cho 110 cơ sở. https://dcc.mae.gov.vn/bo-nong-nghiep-va-moi-truong-thuc-hien-phan-bo-han-ngach-phat-thai-cu-the-cho-cac-co-so-3881.htm
- **[R5]** Nghị định 29/2026/NĐ-CP: Sàn giao dịch các-bon trong nước. https://vanban.chinhphu.vn/?classid=1&docid=216694&pageid=27160&typegroupid=4
- **[R6]** Thông tư 11/2026/TT-BNNMT: Quản lý, vận hành Hệ thống đăng ký quốc gia về hạn ngạch phát thải khí nhà kính và tín chỉ các-bon. https://vanban.chinhphu.vn/?docid=217020&pageid=27160
- **[R7]** Nghị định 119/2025/NĐ-CP: Sửa đổi, bổ sung một số điều của Nghị định 06/2022/NĐ-CP. https://vanban.chinhphu.vn/?docid=213875&pageid=27160
- **[R8]** Quyết định 21/2025/QĐ-TTg: Tiêu chí môi trường và xác nhận dự án thuộc danh mục phân loại xanh. https://vanban.chinhphu.vn/?docid=214447&pageid=27160
- **[R9]** GHG Protocol Corporate Accounting and Reporting Standard. https://ghgprotocol.org/sites/default/files/standards/ghg-protocol-revised.pdf
- **[R10]** World Bank Carbon Pricing Dashboard. https://carbonpricingdashboard.worldbank.org/compliance/price
