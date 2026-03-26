import { Brevo } from "@getbrevo/brevo";
import { brevoClient } from "../lib/brevo.client";
import { catchAsync } from "../error/tryCatchAsync";
import { env } from "../config/env.config";

export const sendEmailService = catchAsync(async (toEmail:string , token:string) =>{

    const url = `${env.CLIENT_URL}/verify-email?token=${token}`;

    const result   = await brevoClient.transactionalEmails.sendTransacEmail({
        subject:"verify your email",
        htmlContent:`
        <h2>Welcome 👋</h2>
        <p>Please verify your email:</p>
        <a href="${url}" style="padding:10px 20px;background:black;color:white;text-decoration:none;">
          Verify Email
        </a>
        <p>This link expires in 15 minutes.</p>
        `,
        sender:{name: env.MAIL_FROM_NAME, email: env.MAIL_FROM_EMAIL},
        to:[{email: toEmail}]
    })

})