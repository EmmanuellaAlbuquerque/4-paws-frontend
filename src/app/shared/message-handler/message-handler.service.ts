import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessageServiceState } from '../../models/MessageServiceState';
import { MessageStatus } from '../../models/MessageStatus';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(private location: LocationStrategy, private messageService: MessageService) {

  }

  public handleNavigationMessage(): void {
    const state = this.location.getState();

    if (state && (state as MessageServiceState)) {
      const statusResponse = state as MessageServiceState;
      const message: MessageStatus = statusResponse.message;

      if (message?.content?.length > 0) {
        this.messageService.add({
          severity: message.status,
          summary: message.summary?.toUpperCase(),
          detail: message.content
        });
      }
    }
  }
}
