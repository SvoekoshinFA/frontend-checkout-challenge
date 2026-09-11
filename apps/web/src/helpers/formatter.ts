export default class Formatter {
  static currency(price: number, currency: string = "RUB") {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
    }).format(price);
  }
  static piece(price: number, postfix: string = "шт.") {
    return `${price.toLocaleString('ru-RU')} ${postfix}`;
  }
}