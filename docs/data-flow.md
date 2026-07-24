# Data Flow — Inputs → Outputs (CarbonPilot)

Reference spec for the data model boundaries and output-derivation logic. Referenced by [CLAUDE.md](../CLAUDE.md). Preserve legal references and thresholds verbatim.

## Input sources (4 categories)

### A. Input từ doanh nghiệp (Enterprise)
| Nhóm | Dữ liệu | Ghi chú |
|---|---|---|
| 1. Thông tin chung | Tên DN, mã số thuế; ngành (nhiệt điện / sắt thép / xi măng); danh sách cơ sở/nhà máy trực thuộc (nếu tập đoàn đa cơ sở); mã cơ sở theo Hệ thống đăng ký quốc gia (nếu có) | |
| 2. Hạn ngạch & phát thải | Hạn ngạch được cấp trong kỳ (tấn CO₂e); phát thải thực tế lũy kế đầu kỳ→hiện tại (từ báo cáo kiểm kê khí nhà kính định kỳ DN đã lập); sản lượng đã sản xuất trong kỳ; sản lượng kế hoạch còn lại; hệ số phát thải/đơn vị sản phẩm theo CN hiện dùng; lượng tín chỉ carbon đang sở hữu (nếu có) | |
| 3. Tối ưu phương án | Danh sách phương án đầu tư công nghệ khả dụng; vốn đầu tư; % giảm phát thải kì vọng; thời gian hoàn vốn; khả năng chuyển đổi nhiên liệu thay thế (% công suất tối đa áp dụng, chi phí chuyển đổi); ngân sách tuân thủ tối đa sẵn sàng chi trong kỳ; **quyết định lựa chọn phương án trên thực tế** | ⚠️ Open question — see below |
| 4. ESG / phi tài chính | Báo cáo ESG (nếu có / không bắt buộc nộp); cam kết Net Zero / mục tiêu môi trường tự nguyện (nếu có); lộ trình đạt Net Zero | Optional input |

### B. Input từ khung pháp lý (Legal framework)
| Nhóm | Dữ liệu | Nguồn |
|---|---|---|
| 1. Hạn ngạch phát thải | Quy định xử lý khi vượt hạn ngạch; chu kỳ kiểm kê, báo cáo và nộp kết quả | |
| 2. Tín chỉ carbon | Tỷ lệ tối đa bù trừ (30%); loại tín chỉ được phép (trong nước / quốc tế công nhận); lộ trình vận hành thị trường (thí điểm → chính thức); danh mục ngành/lĩnh vực phải kiểm kê & tham gia ETS; danh mục cơ sở phát thải lớn phải tuân thủ | |
| 3. Công nghệ giảm phát thải | Danh mục công nghệ giảm phát thải theo từng ngành | Bộ Công Thương, Bộ Xây dựng, IEA, IFC, World Bank, GIZ... |
| 4. Chính sách tài chính xanh | Tín dụng xanh, trái phiếu xanh, ưu đãi tài chính; chính sách hỗ trợ chuyển đổi xanh của Nhà nước | Bộ Tài chính |
| 5. Quy định cập nhật | Thay đổi chính sách về hạn ngạch, tín chỉ, MRV, ESG | Cổng thông tin Chính phủ, Bộ Nông nghiệp & Môi trường, Bộ Tài chính, Văn phòng Chính phủ |

### C. Input từ thị trường carbon (Carbon market)
| Dữ liệu | Nguồn |
|---|---|
| Giá tín chỉ carbon trong nước (khi hình thành) | Sàn giao dịch carbon Việt Nam |
| Giá tham chiếu quốc tế (EU ETS, CORSIA, VCM...) | ICE, EEX, World Bank Carbon Pricing Dashboard... |
| Biến động giá, thanh khoản, khối lượng giao dịch | Sàn giao dịch / nguồn dữ liệu thị trường |

### D. Input từ ngân hàng (Bank)
- Chính sách, bộ tiêu chuẩn (thẩm định tín dụng xanh).

---

## Outputs by stakeholder (with derivation)

### Doanh nghiệp (Enterprise)
| Output | Suy ra từ input/fact nào |
|---|---|
| Dự báo hạn ngạch còn dư/thiếu bao nhiêu tấn đến cuối kỳ | Dữ liệu hạn ngạch & phát thải của DN |
| Cảnh báo sớm nguy cơ vượt hạn ngạch + hậu quả (có thể bị trừ hạn ngạch 2 năm tới nếu không xử lý) | Dữ liệu hạn ngạch & phát thải + quy định: bù trừ tối đa 30% hạn ngạch được phân bổ; phần thiếu sau thời hạn bị khấu trừ vào kỳ tiếp theo |
| Bảng so sánh phương án (chi phí, tCO₂ giảm, ROI, thời gian, ESG) + khuyến nghị tổ hợp tối ưu chi phí | Dữ liệu phương án từ DN + giá thị trường hiện tại |
| Gợi ý lộ trình cải thiện để đủ điều kiện vay vốn xanh / nâng ESG Score | |
| What-if theo kịch bản giá tín chỉ biến động (ngưỡng giá quyết định: thấp hơn → làm gì, cao hơn → làm gì) | |
| Chatbot tư vấn | |

### Nhà đầu tư (Investor)
Dashboard đánh giá đầu tư xanh:
- ESG Score
- Lộ trình đạt Net Zero theo từng giai đoạn (Optional) → mức độ khả thi của lộ trình
- Xu hướng giảm thải carbon theo kỳ/năm

- **Đầu vào**: báo cáo ESG, activity data, dự án xanh + LLM extraction
- **Ngưỡng**: ESG Score ≥ 82/100, Overall Score ≥ 80/100
- **Tham khảo**: MSCI ESG Ratings, Sustainalytics, quỹ ESG ASEAN

### Ngân hàng (Bank)
Dashboard thẩm định tín dụng xanh:
- Lộ trình đạt Net Zero theo từng giai đoạn (Optional) → mức độ khả thi
- Mức độ tuân thủ (cuối kỳ)
- Xu hướng giảm phát thải carbon theo kỳ/năm

- **Đầu vào**: dữ liệu DN upload
- **Tham khảo**: IFC Performance Standards & hướng dẫn tín dụng xanh của NHNN
- **Policy rule**:
  - Quyết định 263/QĐ-TTg (hạn ngạch)
  - Quyết định 13/2024/QĐ-TTg (đối tượng phải kiểm kê)
  - Quy định tối đa 30% bù trừ bằng tín chỉ carbon
  - **Quyết định 21/2025/QĐ-TTg (Taxonomy Xanh)**
- **Ngưỡng rủi ro**: Thiếu hạn ngạch < 10% → Low

### Cơ quan quản lý (Regulator)
**Dashboard dữ liệu tổng quan**:
- Tổng lượng phát thải, hạn ngạch đã cấp, nhu cầu mua/bán tín chỉ carbon toàn quốc → theo ngành, lĩnh vực, địa phương
- Bảng so sánh dữ liệu theo ngành / lĩnh vực / địa phương
- Tổng hợp phát thải, hạn ngạch, nhu cầu mua/bán tín chỉ DN cung cấp toàn quốc → phân loại ngành (xi măng, thép...), lĩnh vực (công nghiệp...), địa phương

**Báo cáo cảnh báo tuân thủ & mức độ chuyển đổi xanh**:
- Số lượng, % DN đáp ứng hạn ngạch (hiện tại) / thiếu hạn ngạch (hiện tại) / có thể vượt (cuối kỳ)
- Mức tăng/giảm phát thải theo quý/tháng/năm của từng ngành, lĩnh vực, địa phương
- Số lượng, % DN có báo cáo ESG, cam kết Net Zero, đầu tư công nghệ giảm phát thải, có thể dùng nhiên liệu thay thế
- **Xu hướng lựa chọn chuyển đổi xanh thay vì mua tín chỉ** (suy ra từ "quyết định lựa chọn phương án trên thực tế" của DN)

**Dữ liệu Opt-in View** (nếu DN đồng ý chia sẻ): ESG, tiến độ giảm phát thải

- **Derivation**: tổng hợp dữ liệu phát thải/hạn ngạch/nhu cầu mua-bán của DN → tính %; so sánh theo thời gian; tổng hợp % DN có ESG/Net Zero (DN chọn Có/Không)/đầu tư công nghệ; thống kê theo lựa chọn DN.

---

## Open questions / team notes

- **"Quyết định lựa chọn phương án trên thực tế" (Nhóm 3, input doanh nghiệp)** — output cho Cơ quan quản lý về xu hướng chuyển đổi xanh thay vì chỉ mua tín chỉ. **Phương Vũ đang phân vân: doanh nghiệp có bắt buộc phải chọn/input trường này không?** → Cần chốt: required hay optional. Ảnh hưởng đến: (1) dữ liệu model nhận, (2) khả năng tổng hợp xu hướng cho regulator.
