export interface IMailerProvider {
  sendEmail(
    to: string,
    subject: string,
    template: string,
    variables: Record<string, any>,
    attachments?: Array<{ filename: string; path: string }>,
  ): Promise<void>;
}
