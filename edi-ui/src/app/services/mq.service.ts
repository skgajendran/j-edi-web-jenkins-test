// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import stompobservable from 'webstomp-obs';
import Client from 'webstomp-obs/types/client';
import { ConnectedClient } from 'webstomp-obs/types/connectedClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first'
import 'rxjs/add/observable/from'

export class MqService {

  private wsClient: Client
  private sourceConnection: Observable<ConnectedClient>
  private topic: string
  private url: string;
  private login: string;
  private password: string;

  constructor () {
  }
  
  public connect(url: string, login: string, password: string, topic: string) : void {
    this.topic = topic;
    this.url = url;
    this.login = login;
    this.password = password;
    this.wsClient = stompobservable.client(url, {debug:false, maxConnectAttempt:10, ttlConnectAttempt:1000, binary:false, heartbeat:{incoming: 10000, outgoing: 10000}});
    this.sourceConnection = this.wsClient.connect({login: login, passcode: password});
  }

  public onConnect = (onConnect: Function, onError?: Function): void => {
    this.sourceConnection.subscribe(
      function (connectedClient: ConnectedClient) {
          onConnect(connectedClient)
      },
      function (err: string) {
          onError(err) && onError(err);
      }
    )
  }

  public onMessage = (onMessageFn: Function, onError?: Function): void => {
    this.onConnect(
      (connectedClient: ConnectedClient) => {
        connectedClient
          .subscribeBroadcast(this.topic, {ack: 'client'})
          .subscribe(
              function (message) {
                  onMessageFn(message)
                  message.ack()
              },
              function (err) {
                  onError(err) && onError(err);
              }
          )
      },
      (err: string) => {
        onError(err)
      }
    )
  }

  public onError = (onErrorMsgFn: Function): void => {
    this.onConnect(
      (connectedClient: ConnectedClient) => {
        connectedClient.error()
          .subscribe(
              function (message) {
                  onErrorMsgFn(message)
              }
          )
      }
    )
  }

  public onConnectionError = (onConnectionErrorMsgFn: Function): void => {
    this.onConnect(
      (connectedClient: ConnectedClient) => {
        connectedClient.connectionError()
          .subscribe(
              function (message) {
                  onConnectionErrorMsgFn(message)
              }
          )
      }
    )
  }

  public sendBroadcast = (message: string) : void => {
    this.onConnect(
      (connectedClient: ConnectedClient) => {
        connectedClient.send(this.topic, message)
      },
      (error: string) => {

      }
    )
  }

}