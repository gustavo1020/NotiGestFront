import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { NavComponent } from '../app/components/nav/nav.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ToolbarModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NotiGest';
}
