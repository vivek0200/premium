import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PremiumPaymentsService } from '../paymentform.service';
@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})
export class PaymentformComponent {
  formSubmitted = false;
  premiumForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private premiumPaymentsService: PremiumPaymentsService
  ) {
    this.premiumForm = this.formBuilder.group({
      paymentDate: '',
      bankTransactionId: '',
      premiumAmount: 0,
      lateFee: 0,
      paymentMethodId: 0,
      premiumMasterId: 0
    });
  }

  onSubmit(): void {
    if (this.premiumForm.valid) {
      const premiumPayments = this.premiumForm.value;
      this.premiumPaymentsService.addPremiumPayments(premiumPayments)
        .subscribe(() => {
          // Handle successful submission, e.g., show a success message
          this.formSubmitted = true;
          console.log('Premium payments added successfully.');
        }, (error) => {
          // Handle error, e.g., show an error message
          console.error('Failed to add premium payments:', error);
        });
    }
  }
}
