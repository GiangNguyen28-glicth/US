"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailResetPassword = void 0;
class MailResetPassword {
    static createHTML(fullname, code) {
        const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;200;300;400;500;600&family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
              rel="stylesheet"
            />
          </head>
          <style></style>
          <body
            style="
              font-size: 62.5%;
              font-family: 'Be Vietnam Pro', sans-serif;
              font-family: 'Poppins', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              background-color: rgb(245, 245, 245);
              min-height: 100vh;
              font-size: black !important;
            "
          >
            <div class="main" style="margin: auto">
              <div class="box" style="background-color: white; padding: 20px 40px">
                <div class="logo" style="margin-bottom: 40px">
                  <img
                    src="https://f002.backblazeb2.com/file/summonshop/logo.png"
                    alt="logo"
                  />
                </div>
                <h3
                  style="
                    font-size: 28px;
                    font-weight: 400;
                    margin-bottom: 0px;
                    color: #000;
                  "
                >
                  Chào,
                </h3>
                <p style="font-size: 40px; color: #000; margin: 0">
                  <b>${fullname}</b>
                </p>
                <div class="image" style="width: 260px; margin: 50px auto">
                  <img
                    src="https://f002.backblazeb2.com/file/summonshop/resetpassword.png"
                    style="display: block; height: 100%; width: 100%; object-fit: cover"
                  />
                </div>
                <p style="font-size: 14px; color: #555 !important">
                  ${fullname} thân mến <br />
                  Vui lòng nhập mã OTP dưới đây để thay đổi mật khẩu mới
                </p>
                <div class="code" style="margin: 20px 0">
                  <span style="font-size: 40px; font-weight: 600">${code}</span>
                </div>
                <p style="font-size: 10px; color: #555555">
                  Mã xác thực này sẽ hết hiệu lực trong 15 phút. Để đảm bảo an toàn, vui
                  lòng không chia sẻ mã này cho bất cứ ai.
                </p>
                <p style="font-size: 10px; color: #555555">
                  Nếu bạn có bất cứ câu hỏi nào hay thắc mắc nào xin hãy liên hệ tới
                  Email shopme293@gmail.com.<br />
                  All right reserved. Update
                  <a
                    href="#"
                    rel="noopener"
                    style="text-decoration: none; color: #555555"
                    target="_blank"
                    >email preferences</a
                  >
                </p>
                <span style="font-weight: 500">Ho Chi Minh City</span>
              </div>
            </div>
          </body>
        </html>`;
        return html;
    }
}
exports.MailResetPassword = MailResetPassword;
//# sourceMappingURL=mail.reset_password.js.map