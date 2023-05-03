const createBookingRequest = () => {
    return `<div>
            <h3>Chúng tôi đã nhận được yêu cầu của bạn</h3>
            <div>Chúng tôi sẽ xem xét và phản hồi sớm nhất cho bạn</div>
            <div>Nếu có thắc mắc hãy liên lạc ngay với chúng tôi. Sdt: 132456789</div>
        </div>`;
};

const acceptedBookingRequest = (booking, room) => {
    return `        <div>
    <h3>Xin được thông báo yêu cầu của bạn đã được chập nhận</h3>
    <div>
        Dưới đây là thông tin đơn đặt phòng, vui lòng xem kỹ thông tin
    </div>
    <br />
    <h3>Thông tin đặt phòng</h3>
    <table>
        <tr>
            <th colspan="2">Thông tin đặt phòng</th>
        </tr>
        <tr>
            <td><b>Họ tên</b></td>
            <td>${booking.lastname} ${booking.firstname}</td>
        </tr>
        <tr>
            <td><b>Ngày sinh</b></td>
            <td>${booking.dateOfBirth}</td>
        </tr>
        <tr>
            <td><b>Mssv</b></td>
            <td>${booking.studentId}</td>
        </tr>
        <tr>
            <td><b>Giới tính</b></td>
            <td>${booking.gender}</td>
        </tr>
        <tr>
            <td><b>Email</b></td>
            <td>${booking.email}</td>
        </tr>
        <tr>
            <td><b>Điện thoại</b></td>
            <td>${booking.phone}</td>
        </tr>
        <tr>
            <th colspan="2">Thông tin phòng</th>
        </tr>
        <tr>
            <td><b>Tên phòng</b></td>
            <td>${room.name}</td>
        </tr>
        <tr>
            <td><b>Số lượng giường</b></td>
            <td>${room.numberBed}</td>
        </tr>
        <tr>
            <td><b>Diện tích</b></td>
            <td>${room.area}</td>
        </tr>
        <tr>
            <td><b>Giá phòng</b></td>
            <td>${priceFormat(room.price)}</td>
        </tr>
    </table>
    <br>
    <div>Xác nhận bằng các thanh toán tiền đặt cọc là ${booking.priceDeposit}/div>
    <div>Nhấn vào link dưới để thanh toán</div>
    <div>
        <a href="http://localhost:5000/booking/${booking._id}/deposit/paypal" target="_blank">Đặt cọc</a>
    </div>
    <div>Nếu có thắc mắc hãy liên lạc ngay với chúng tôi. Sdt: 132456789</div>
    </div>`;
};

const depositBooking = (booking) => {
    return `<div>
            <h3>Xin thông báo bạn đã đặt cọc thành công</h3>
            <div>Đây là tài khoản của bạn để truy cập website</div>
            <div>username: ${booking.studentId + "@dormitory"}</div>
            <div>password: 123</div>
            <div>Website: <a href="https://sgu-dormitory.vercel.app/admin" target="_blank">Dormitory</a></div>
            <div>Vui lòng chuẩn bị tư trang vào ở đúng ngày</div>
            <div>Lưu ý nếu bạn không thanh toán khi tới ngày thì đặt phòng sẽ bị huỷ bỏ cũng như bạn sẽ mất tiền cọc</div>
            <div>Nếu có thắc mắc hãy liên lạc ngay với chúng tôi. Sdt: 132456789</div>
        </div>`;
};

const paidBooking = () => {
    return `<div>
            <h3>Xin thông báo bạn đã thanh toán tiền phòng thành công</h3>
            <div>Chúng tôi sẽ sớm gửi hợp đồng cho bạn</div>
            <div>Nếu có thắc mắc hãy liên lạc ngay với chúng tôi. Sdt: 132456789</div>
        </div>`;
};

const cancelBooking = () => {
    return `<div>
            <h3>Xin thông báo đặt phòng của bạn đã bị huỷ</h3>
            <div>Nếu có thắc mắc hãy liên lạc ngay với chúng tôi. Sdt: 132456789</div>
        </div>`;
};


const priceFormat = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price*1000)
}

module.exports = { createBookingRequest, priceFormat, acceptedBookingRequest, depositBooking, paidBooking, cancelBooking };
