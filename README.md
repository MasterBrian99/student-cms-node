# Student management system

### Features

- Student Registration & Approval Workflow.
- JWT-based Authentication for Students and Admins.
- Admin Dashboard for managing student approvals.
- Email Notifications for approvals and rejections.
- MongoDB database integration with Mongoose ORM.

## **Tech Stack**

- **Backend:** NestJS, Mongoose ORM
- **Database:** MongoDB
- **Authentication:** JWT Authentication
- **Emails:** Nodemailer

### Installation

1. run `npm install`

   > npm install

2. Create a `.env` file in the `backend` directory with the following content:

```bash
PORT=3000

DATABASE_TYPE=postgres

DATABASE_HOST=localhost

DATABASE_USERNAME=postgres

DATABASE_PASSWORD=password

DATABASE_PORT=5432

DATABASE_NAME=pinista_dev

SYNC_MODE=0

PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEyma2voFhdoUC\nv5N01gSAGGy3fcbXFawotAP4K/YjJoUK8XcIQQVOr/8ywiY7IWZr1NfprnnXw2eO\n5Y6FY3xFsw9n+Vyq1dfrnuUDtBortCFpfLULaIs6DqS+US4SJq8I7MRAKdHsIbAG\nAOgO7BhIEzVeDWk0v+MVUnMWurn0vRFMzFmVMY3k6fdfE+qhwT/q1hXV+34Uro3W\nssTvLANm9tpLoicJcV586W0TTVePD0U01sW6XgQU6pmRtD0fCagGQEAZbFdx2u9m\nImkQonRBYZUX/FAC4XaEh6vaFWtROpfC8hfxDCnV/7BA3Jv99XPviS+WgMXSp+04\ntBKtgQcjAgMBAAECggEAAJhOMEHqHnzHpExaG1+E7ynwijPf8Xxj0i/yvLlWXfZw\nHd1raz1ejN8miuVGkWFUeFb8qKdmpl3xInl2IE+C0gD9pd3By9SOecHAa8M+1DWp\nmpjWuJ2TOvsJa2atj+mNfnNHuwJ2bIq7ZcT7dyeM6ArgbI+RjVK9luEL3eTswe5B\nLOJoPZzcz/YnOdxFHrut1B3XFW+YCCAfu6Mdy1RDgd99BiqJqHgiAhGRnlhzzIuj\n1bNEGd8JYJt3oERHY4+VKobEr4E7H+jZbsaBp0tse2/QkQBBENWAHJGXDB+TYAnl\nOXJ0XMCTz/mLfpgHjVDWsie7D1CWkM4kRYq+QWYegQKBgQDnL6846xLk3o9BAsKh\nE16pLbgZoh4mslPmJxw9CbdvslPUYCWSN1tWmudV1/4qNyAdVZsIrCvKvGsPpFoW\nXA7yXc1W38lCkh8/6/nFKEyTPzH4+HU9IdY68v3K075xTsQsaV7XYB2BE2Zs87XL\nbH5z0jmgS+fbX1ivEZeRy1eAswKBgQDZ6aBTSZlJjbhyH0tee8fZgDcjCdDDlzap\nBzZGX4Xt+R8bjlXf1lGJsJhfspqecc+nsNjv9R/mbMTWEld+1ChIz8/sfXLkiqnB\n4Om5AoHs0TiQY2CR/W09t/8tXkGSzHMQjKOFH2UkxgNhcUFUK6miUaXZka9LMO5p\nSR3MgCu30QKBgDMgA3Ll4WbFpQ5uatYuL2fgWW8pv9s04oLqMT96T5ue5xT3MjfU\nkBll5jTAsE9ro2l5TfCsCn8qDc8GvHlnYFLO1aMZmCtlnw2GxNSJ5e1GM2nooByl\nx/d/Vwqsqtfp4E4l+zhL5BpwTN1ZQ+G5m3lHi0DcqGiF/Fmy3T77pd0rAoGBAJM+\n5nLg/I9TEBstQkRp57T0ik1GyKYhe3Hjyazrxxfyii6YkzZZH2emyI+BpDEEPojV\nWwFp5VBSlv8ADddJjJ8GrTzj18rOV78GN2goZZqcFVibjhmX4UUfG3KQikajl+zK\n24OMn0+l7YreeIJjrpBcE3Fcm9J3EeJa4aPZx7DBAoGAQMbfh3HYRR/z3yxoF2aP\ngr1T8ljpHeTtmp4TX9Ti7q3f9hPSM6+Qnjw1AcC79w0yu8k5BkX905ErWyDjUXUW\nPS5L9QRnwxhkN0lDmFhcwC5BaioqyZ2BewD1R6WXBWUOHENTbbtUcBxG37rnDqkF\n7UFXUP/0uG/hJS4YdfMkclk=\n-----END PRIVATE KEY-----\n"

PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxMpmtr6BYXaFAr+TdNYE\ngBhst33G1xWsKLQD+Cv2IyaFCvF3CEEFTq//MsImOyFma9TX6a5518NnjuWOhWN8\nRbMPZ/lcqtXX657lA7QaK7QhaXy1C2iLOg6kvlEuEiavCOzEQCnR7CGwBgDoDuwY\nSBM1Xg1pNL/jFVJzFrq59L0RTMxZlTGN5On3XxPqocE/6tYV1ft+FK6N1rLE7ywD\nZvbaS6InCXFefOltE01Xjw9FNNbFul4EFOqZkbQ9HwmoBkBAGWxXcdrvZiJpEKJ0\nQWGVF/xQAuF2hIer2hVrUTqXwvIX8Qwp1f+wQNyb/fVz74kvloDF0qftOLQSrYEH\nIwIDAQAB\n-----END PUBLIC KEY-----\n"

NODE_ENV="development"

JWT_EXPIRATION_TIME=1d

API_VERSION=1

ENABLE_DOCUMENTATION=1

MAIL_HOST=localhost

MAIL_PORT=1025

MAIL_SECURE=0

MAIL_USER=brian

MAIL_PASS=1234

MAIL_FROM=pasindu@gmail.com

ADMIN_EMAIL=admin@example.com

```

3. run backend
   > npm run start:dev
