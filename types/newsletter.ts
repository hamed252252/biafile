export interface NewsletterEntity {
  id: number;
  email: string;
  registerDate: string;
  editDate: string;
  registerTime: string;
  editTime: string;
  uniqCode: string;
  jsonLableTexts: string;
  resultJsonLables: any[];
  visible: boolean;
}

export interface NewsletterResponse {
  status: string;
  message: string;
  entities: NewsletterEntity[];
  countAllRecordTable: number;
}

export interface NewsletterPayload {
  registerDate: string;
  editDate: string;
  uniqCode: string;
  registerTime: string;
  editTime: string;
  jsonLableTexts: string;
  resultJsonLables: any[];
  visible: boolean;
  email: string;
}
