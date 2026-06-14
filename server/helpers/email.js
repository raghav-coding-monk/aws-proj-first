exports.registerEmailParams = (email, token) => {
    // 1. Dynamically build the full activation URL using your environment configuration
    const activationLink = `${process.env.CLIENT_URL}/auth/activate/${token}`;

    // 2. BACKUP LOG: This guarantees the link prints to your terminal logs every time!
    console.log('====================================================');
    console.log('📬 EMAIL TEMPLATE GENERATED FOR:', email);
    console.log('👉 BACKUP ACTIVATION LINK:');
    console.log(activationLink);
    console.log('====================================================');

    // 3. Return the standard parameters configuration for AWS SES
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_TO || process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                                <h1 style="color: #111;">Verify your email address</h1>
                                <p>Please click the button below to complete your registration and activate your account:</p>
                                
                                <div style="margin: 25px 0;">
                                    <a href="${activationLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                        Activate My Account
                                    </a>
                                </div>
                                
                                <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
                                <p style="font-size: 12px; color: #666;">If the button doesn't work, copy and paste this URL into your browser:</p>
                                <p style="font-size: 12px; color: #0070f3; word-break: break-all;">${activationLink}</p>
                            </body>
                        </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    };
};
                                    
            
            
           
