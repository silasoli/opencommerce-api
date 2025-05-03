class FormatUtilCls {
  formatDate(date: Date): string {
    return date
      .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      .split(' ')[0];
  }
  toPTBRDateString(date: Date): string {
    return date.toLocaleDateString('pt-br');
  }
  capitalizeFirst(text: string): string {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }
  formatCPF(document: string): string {
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  formatPhone(phone: string): string {
    if (phone.length === 13 && phone.startsWith('55'))
      phone = phone.substring(2);

    return `(${phone.substring(0, 2)}) ${phone.substring(2, 3)} ${phone.substring(3, 7)}-${phone.substring(7)}`;
  }
  capitalizeWords(text: string): string {
    return text.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }
  getImageIdFromUrl(url: string): string | null {
    const regex = /\/([a-f0-9-]+)\/[^/]+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  convertCentsToReais(priceInCents: number): number {
    return parseFloat((priceInCents / 100).toFixed(2));
  }
  convertReaisToCent(priceInReais: number): number {
    return parseFloat((priceInReais * 100).toFixed(0));
  }
}
export const FormatUtil = new FormatUtilCls();
