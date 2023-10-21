export type EmailDto = {
  destination: string;
  subject: string;
  template: string;
  replacements: any;
};
