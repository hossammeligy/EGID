// order-form.component.ts
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  @Output() orderPlaced = new EventEmitter<void>(); 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stockSymbol: string, orderType: string },
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      stockSymbol: [{ value: this.data.stockSymbol, disabled: true }, Validators.required],
      orderType: [{ value: this.data.orderType, disabled: true }, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }
  
  onSubmit() {
    if (this.orderForm.valid) {
      const order = {
        stockSymbol: this.orderForm.get('stockSymbol')!.value,
        orderType: this.orderForm.get('orderType')!.value,
        quantity: this.orderForm.get('quantity')!.value
      };
      this.http.post(this.baseUrl + 'orders', order).subscribe({
        next: (response) => {
          console.log('Order created', response);
          this.orderPlaced.emit();
          this.dialogRef.close();
        },
        error: (err) => console.error('Error creating order', err)
      });
    }
  }
}
