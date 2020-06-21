import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: any[] = [];

  constructor(private clientsService: ClientsService) {
    try {

      this.clientsService.getClientes()
        .subscribe((data: any) => {
          this.clients = data.data;
        })
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {
  }

}
