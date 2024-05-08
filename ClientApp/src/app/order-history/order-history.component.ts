// Make sure to import Component and OnInit from @angular/core
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Corrected import

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orders: Orders[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.refreshOrders();
  }

  refreshOrders(): void {
    this.http.get<Orders[]>(this.baseUrl + 'orders').subscribe((result: Orders[]) => {  // Added explicit type for result
      this.orders = result;
      console.debug('Orders updated', this.orders);
    }, (error: any) => console.error('Failed to refresh orders', error));  // Added explicit type for error
  }
}

// Interface should be included if not imported
interface Orders {
  orderId: number;
  stockSymbol: string;
  orderType: string;
  quantity: number;
  orderTime: string;
}
