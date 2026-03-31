import { Brevo } from "@getbrevo/brevo";
import { brevoClient } from "../lib/brevo.client";
import { catchAsync } from "../error/tryCatchAsync";
import { env } from "../config/env.config";

export const sendEmailService = async(toEmail:string , token:string) =>{

    const url = `${env.CLIENT_URL}/verify-email?token=${token}`;

    const result   = await brevoClient.transactionalEmails.sendTransacEmail({
        subject:"verify your email",
        htmlContent: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Verify Email - Campus Connect</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="background-color: #f9fafb; padding: 24px 0"
            >
              <tr>
                <td align="center">

                  <!-- Card -->
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 480px;
                      background-color: #ffffff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    "
                  >

                    <!-- Header -->
                    <tr>
                      <td
                        style="
                          background-color: #2563eb;
                          padding: 20px;
                          text-align: center;
                          color: #ffffff;
                        "
                      >
                        <h1 style="margin: 0; font-size: 22px;">
                          Campus Connect
                        </h1>
                        <p style="margin: 4px 0 0; font-size: 14px;">
                          Connect. Learn. Grow.
                        </p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding: 24px; color: #111827;">

                        <p style="font-size: 14px; margin: 0 0 12px;">
                          Hello,
                        </p>

                        <p style="font-size: 14px; margin: 0 0 16px;">
                          Welcome to <strong>Campus Connect</strong> 🎓
                        </p>

                        <p style="font-size: 14px; margin: 0 0 16px;">
                          Please verify your email address by clicking the button below:
                        </p>

                        <!-- Button -->
                        <div style="text-align: center; margin: 24px 0;">
                          <a
                            href="${url}"
                            style="
                              background-color: #2563eb;
                              color: #ffffff;
                              padding: 12px 24px;
                              text-decoration: none;
                              border-radius: 6px;
                              font-size: 14px;
                              font-weight: bold;
                              display: inline-block;
                            "
                          >
                            Verify Email
                          </a>
                        </div>

                        <p style="font-size: 13px; margin: 0 0 12px; color: #374151;">
                          This link will expire in <strong>15 minutes</strong>.
                        </p>

                        <p style="font-size: 13px; margin: 0 0 16px; color: #374151;">
                          If you did not create an account, you can safely ignore this email.
                        </p>

                        <p style="font-size: 13px; margin: 24px 0 0;">
                          Regards,<br />
                          <strong>Campus Connect Team</strong>
                        </p>

                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
        sender:{name: env.MAIL_FROM_NAME, email: env.MAIL_FROM_EMAIL},
        to:[{email: toEmail}]
    })
}