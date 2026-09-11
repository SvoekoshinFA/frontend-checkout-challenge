import type { Response } from "../types/Response";
import type { Session } from "../types/Session";
import type { Product } from "../types/Product";
import type { Cart, CartItem } from "../types/Cart";
import { store } from "../store";

export default class API {
  private static URL = 'http://localhost:4000/api';

  private static async query<T>(
    method: string,
    link: string,
    payload: any
  ): Promise<T> {    
    const session = store.getState().session;
    const options: RequestInit = {
      method,
    }
    if (session?.token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${session.token}`
      }
    }
    if (["POST", "PUT"].some((e) => e === method)) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      }
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${API.URL}${link}`, options);    
    if (response.status === 204) {
      return undefined as T;
    }
    const json = await response.json() as Response<T>;
    if (json.error) {
      throw new Error(json.error.message);
    }
    if (!json.data) {
      throw new Error("Пустой ответ");
    }
    return json.data
  }

  public static postSessions(): Promise<Session> {
    return API.query<Session>("POST", "/sessions", {});
  }

  public static getProducts(): Promise<Product[]> {
    return API.query<Product[]>("GET", "/products", {});
  }

  public static getCart(): Promise<Cart> {
    return API.query<Cart>("GET", "/cart", {});
  }

  public static async getCartItem(id: string): Promise<CartItem> {
    const item = await API.query<CartItem>("GET", `/cart/items/${id}`, {}).catch(() => ({ quantity: 0 } as CartItem));
    return item;
  }

  public static putCartItem(id: string, quantity: number): Promise<CartItem | void> {
    if (quantity <= 0) {
      return API.deleteCartItem(id);
    }
    return API.query<CartItem>("PUT", `/cart/items/${id}`, { quantity });
  }

  public static deleteCartItem(id: string): Promise<void> {
    return API.query<void>("DELETE", `/cart/items/${id}`, {});
  }
}