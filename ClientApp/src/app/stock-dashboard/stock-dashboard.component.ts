// stock-dashboard.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { OrderFormComponent } from '../order-form/order-form.component';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

interface Stocks {
  timeStamp: string;
  currentPrice: number;
  symbol: string;
}

interface StockHistory {
  symbol: string;
  price: number;
  timeStamp: string;
}

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.css']
})
export class StockDashboardComponent implements OnInit {
  public stocks: Stocks[] = [];
  public selectedStockHistory: StockHistory[] = [];
  public selectedSymbol?: string;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      legend: { display: true }
    }
  };

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.http.get<Stocks[]>(this.baseUrl + 'stock').subscribe(result => {
      this.stocks = result;
      if (this.stocks.length > 0 && !this.selectedSymbol) {
        this.selectedSymbol = this.stocks[0].symbol;
        this.fetchStockHistory(this.selectedSymbol);
      }
    });
  }

  openOrderForm(stockSymbol: string, orderType: string) {
    this.dialog.open(OrderFormComponent, { width: '250px', data: { stockSymbol, orderType } });
  }

  fetchStockHistory(symbol: string) {
    if (!symbol) {
      console.warn('No symbol selected');
      return;
    }
    this.http.get<StockHistory[]>(`${this.baseUrl}stock/${symbol}/history`).subscribe(history => {
      this.selectedStockHistory = history;
      this.updateChartData(history);
    });
  }

  updateChartData(history: StockHistory[]) {
    this.lineChartData = [{
      data: history.map(h => h.price),
      label: 'Stock Price'
    }];
    this.lineChartLabels = history.map(h => new Date(h.timeStamp).toLocaleDateString());
  }
}