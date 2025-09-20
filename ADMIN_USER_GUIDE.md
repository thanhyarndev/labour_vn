# Hướng Dẫn Sử Dụng Admin - Labor Vietnam

## 📋 Tổng Quan
Hệ thống admin cho phép quản lý Keywords, Publications, và Scholars. Tất cả đều có thể tạo, chỉnh sửa, xóa và liên kết với nhau.

## 🚀 Bước 1: Truy Cập Admin Panel
1. Mở trình duyệt và truy cập: `http://localhost:3000/admin`
2. Bạn sẽ thấy dashboard với 4 mục chính:
   - **Scholars** - Quản lý học giả
   - **Publications** - Quản lý ấn phẩm
   - **Keywords** - Quản lý từ khóa
   - **Posts** - Quản lý bài viết

## 🔑 Bước 2: Tạo Keywords (Từ Khóa)

### 2.1 Truy cập trang Keywords
- Click vào **"Keywords"** trong admin dashboard
- Hoặc truy cập trực tiếp: `http://localhost:3000/admin/keywords`

### 2.2 Tạo Keywords mẫu
Click **"Tạo từ khóa mới"** và tạo các keywords sau:

**Keyword 1:**
- **Tên từ khóa:** `labor-rights`
- **Tên hiển thị:** `Labor Rights`
- **Mô tả:** `Quyền lao động và bảo vệ người lao động`
- **Aliases:** `quyền lao động, worker rights, employee rights`
- **Trạng thái:** ✅ Đã phê duyệt

**Keyword 2:**
- **Tên từ khóa:** `minimum-wage`
- **Tên hiển thị:** `Minimum Wage`
- **Mô tả:** `Lương tối thiểu và chính sách tiền lương`
- **Aliases:** `lương tối thiểu, basic wage, living wage`
- **Trạng thái:** ✅ Đã phê duyệt

**Keyword 3:**
- **Tên từ khóa:** `trade-unions`
- **Tên hiển thị:** `Trade Unions`
- **Mô tả:** `Công đoàn và tổ chức người lao động`
- **Aliases:** `công đoàn, labor unions, worker organizations`
- **Trạng thái:** ✅ Đã phê duyệt

**Keyword 4:**
- **Tên từ khóa:** `employment-law`
- **Tên hiển thị:** `Employment Law`
- **Mô tả:** `Luật lao động và quy định việc làm`
- **Aliases:** `luật lao động, labor law, workplace regulations`
- **Trạng thái:** ✅ Đã phê duyệt

## 📚 Bước 3: Tạo Publications (Ấn Phẩm)

### 3.1 Truy cập trang Publications
- Click vào **"Publications"** trong admin dashboard
- Hoặc truy cập trực tiếp: `http://localhost:3000/admin/publications`

### 3.2 Tạo Publications mẫu
Click **"Tạo ấn phẩm mới"** và tạo các publications sau:

**Publication 1:**
- **Tiêu đề:** `Gender Equality in Vietnamese Workplaces: Progress and Challenges`
- **Tác giả:** `Tran Thi Mai, Le Van Duc`
- **Năm:** `2023`
- **Loại ấn phẩm:** `Article`
- **Tạp chí/Nhà xuất bản:** `Asian Population Studies`
- **DOI:** `10.1234/aps.2023.15.2.234`
- **URL:** `https://example.com/publication/1`
- **Tóm tắt:** `This research investigates gender equality in Vietnamese workplaces, focusing on wage gaps, leadership opportunities, and workplace discrimination.`
- **Quote:** `"Gender equality in Vietnamese workplaces has improved significantly over the past decade, but challenges remain in leadership representation."`
- **Liên quan đến lao động Việt Nam:** ✅ Có
- **Từ khóa:** Chọn `labor-rights`, `employment-law`

**Publication 2:**
- **Tiêu đề:** `Minimum Wage Increases and Employment Effects in Vietnam`
- **Tác giả:** `Nguyen Van An, Pham Thi Hoa, Nguyen Van Cuong`
- **Năm:** `2022`
- **Loại ấn phẩm:** `Article`
- **Tạp chí/Nhà xuất bản:** `Economic Development Review`
- **DOI:** `10.1234/edr.2022.7.3.567`
- **URL:** `https://example.com/publication/2`
- **Tóm tắt:** `An economic analysis of minimum wage increases in Vietnam and their impact on employment levels and worker welfare.`
- **Quote:** `"Minimum wage increases in Vietnam have shown positive effects on worker welfare without significant negative employment impacts."`
- **Liên quan đến lao động Việt Nam:** ✅ Có
- **Từ khóa:** Chọn `minimum-wage`, `employment-law`

**Publication 3:**
- **Tiêu đề:** `Trade Union Development in Vietnam: A Historical Perspective`
- **Tác giả:** `Le Minh Cuong, Tran Thi Binh`
- **Năm:** `2024`
- **Loại ấn phẩm:** `Conference Paper`
- **Tạp chí/Nhà xuất bản:** `International Labor Conference 2024`
- **DOI:** `10.1234/ilc.2024.8.1.123`
- **URL:** `https://example.com/publication/3`
- **Tóm tắt:** `This paper examines the historical development of trade unions in Vietnam and their role in protecting worker rights.`
- **Quote:** `"Trade unions in Vietnam have evolved from state-controlled organizations to more independent worker representation bodies."`
- **Liên quan đến lao động Việt Nam:** ✅ Có
- **Từ khóa:** Chọn `trade-unions`, `labor-rights`

## 👨‍🎓 Bước 4: Tạo Scholars (Học Giả)

### 4.1 Truy cập trang Scholars
- Click vào **"Scholars"** trong admin dashboard
- Hoặc truy cập trực tiếp: `http://localhost:3000/admin/scholars`

### 4.2 Tạo Scholars mẫu
Click **"Tạo học giả mới"** và tạo các scholars sau:

**Scholar 1:**
- **Họ:** `Nguyen`
- **Tên đệm:** `Van`
- **Tên:** `An`
- **Danh hiệu:** `Dr.`
- **Chức vụ:** `Professor of Labor Studies`
- **Tổ chức:** `Vietnam National University, Hanoi`
- **Khoa/Bộ môn:** `Asian Studies`
- **Email:** `nguyen.van.an@university.edu.vn`
- **Bio:** `Dr. Nguyen Van An is a leading expert in labor rights and employment law in Vietnam. He has published extensively on worker protection mechanisms and labor market reforms.`
- **Từ khóa hiện có:** Chọn `labor-rights`, `minimum-wage`
- **Ấn phẩm hiện có:** Chọn Publication 1, Publication 2
- **Trạng thái:** ✅ Hoạt động

**Scholar 2:**
- **Họ:** `Tran`
- **Tên đệm:** `Thi`
- **Tên:** `Mai`
- **Danh hiệu:** `Dr.`
- **Chức vụ:** `Associate Professor`
- **Tổ chức:** `Institute of Labour Science and Social Affairs`
- **Khoa/Bộ môn:** `Gender Studies`
- **Email:** `tran.thi.mai@molisa.gov.vn`
- **Bio:** `Dr. Tran Thi Mai specializes in gender equality in the workplace and has conducted extensive research on women's labor rights in Vietnam.`
- **Từ khóa hiện có:** Chọn `labor-rights`, `employment-law`
- **Ấn phẩm hiện có:** Chọn Publication 1, Publication 3
- **Trạng thái:** ✅ Hoạt động

**Scholar 3:**
- **Họ:** `Le`
- **Tên đệm:** `Minh`
- **Tên:** `Cuong`
- **Danh hiệu:** `Dr.`
- **Chức vụ:** `Research Director`
- **Tổ chức:** `Vietnam General Confederation of Labour`
- **Khoa/Bộ môn:** `Trade Union Studies`
- **Email:** `le.minh.cuong@vgcl.org.vn`
- **Bio:** `Dr. Le Minh Cuong is an expert in trade union development and worker organization in Vietnam. He has worked closely with international labor organizations.`
- **Từ khóa hiện có:** Chọn `trade-unions`, `labor-rights`
- **Ấn phẩm hiện có:** Chọn Publication 3
- **Trạng thái:** ✅ Hoạt động

## 🔗 Bước 5: Liên Kết Dữ Liệu

### 5.1 Liên kết Publications với Scholars
1. Vào trang **Publications** (`/admin/publications`)
2. Click **"Sửa"** trên Publication 1
3. Trong phần **"Liên kết với học giả"**, chọn Scholar 1 và Scholar 2
4. Lưu thay đổi
5. Làm tương tự cho Publication 2 và 3

### 5.2 Liên kết Keywords với Publications
1. Vào trang **Keywords** (`/admin/keywords`)
2. Click **"Sửa"** trên từng keyword
3. Trong phần **"Liên kết với ấn phẩm"**, chọn các publications phù hợp
4. Lưu thay đổi

## ✅ Bước 6: Kiểm Tra Kết Quả

### 6.1 Kiểm tra Scholars
- Vào `/admin/scholars` - sẽ thấy 3 scholars với thông tin đầy đủ
- Click vào từng scholar để xem chi tiết
- Kiểm tra phần **"Ấn phẩm"** có hiển thị đúng publications

### 6.2 Kiểm tra Publications
- Vào `/admin/publications` - sẽ thấy 3 publications
- Kiểm tra cột **"Quote"** có hiển thị đúng
- Kiểm tra phần **"Từ khóa"** có liên kết đúng

### 6.3 Kiểm tra Keywords
- Vào `/admin/keywords` - sẽ thấy 4 keywords
- Kiểm tra phần **"Ấn phẩm liên quan"** có hiển thị đúng

## 🎯 Tính Năng Chính

### Quản Lý Scholars
- ✅ Tạo, sửa, xóa scholars
- ✅ Quản lý thông tin cá nhân (họ tên, email, bio, khoa/bộ môn)
- ✅ Liên kết với publications và keywords
- ✅ Quản lý trạng thái (hoạt động/ẩn)

### Quản Lý Publications
- ✅ Tạo, sửa, xóa publications
- ✅ Quản lý thông tin ấn phẩm (tiêu đề, tác giả, năm, DOI, URL)
- ✅ Thêm quote/tóm tắt quan trọng
- ✅ Liên kết với scholars và keywords
- ✅ Phân loại theo loại ấn phẩm (article, book, conference, etc.)

### Quản Lý Keywords
- ✅ Tạo, sửa, xóa keywords
- ✅ Quản lý aliases và mô tả
- ✅ Liên kết với publications
- ✅ Quản lý trạng thái phê duyệt

## 🚨 Lưu Ý Quan Trọng

1. **Luôn lưu dữ liệu** sau khi chỉnh sửa
2. **Kiểm tra liên kết** giữa các entities
3. **Sử dụng dialog xác nhận** khi xóa dữ liệu
4. **Kiểm tra validation** khi tạo mới
5. **Backup database** trước khi thay đổi lớn

## 🔧 Xử Lý Lỗi Thường Gặp

### Lỗi Validation
- Kiểm tra các trường bắt buộc (tiêu đề, tác giả, email)
- Đảm bảo định dạng email đúng
- Kiểm tra URL có đúng format

### Lỗi Liên Kết
- Đảm bảo các entities đã được tạo trước khi liên kết
- Kiểm tra ID có tồn tại trong database
- Refresh trang nếu liên kết không hiển thị

### Lỗi Hiển Thị
- Kiểm tra console browser để xem lỗi
- Đảm bảo tất cả fields đã được lưu đúng
- Kiểm tra network tab để xem API calls

---

**Chúc bạn sử dụng hệ thống thành công! 🎉**
