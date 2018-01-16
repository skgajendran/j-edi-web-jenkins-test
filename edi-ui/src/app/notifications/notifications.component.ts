import { Component, OnInit } from '@angular/core';

import { RabbitMessage } from '../models/RabbitMessage';
import { EventMessageService } from '../services/data/event-message.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private eventMessageService:EventMessageService) { }

  rabbitMessages:Map<any,any> = new Map();

  ngOnInit() {
      this.rabbitMessages = this.eventMessageService.getRabbitMessages();
  }

}
