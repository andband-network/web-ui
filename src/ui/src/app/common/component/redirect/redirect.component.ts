import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['']);
    }
  }

}
