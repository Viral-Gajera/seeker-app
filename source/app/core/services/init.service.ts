import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class InitService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private dataService: DataService) {}

    submitDetails(
        providerId: string,
        itemId: string,
        data: any
    ): Observable<any> {
        return this.http.post(`${this.apiUrl}/init`, {
            context: {
                domain: 'onest:learning-experiences',
                action: 'select',
                version: '1.1.0',
                bap_id: 'kahani-bap.tekdinext.com',
                bap_uri: 'https://kahani-bap.tekdinext.com/',
                bpp_id: 'kahani-bpp.tekdinext.com',
                bpp_uri: 'https://kahani-bpp.tekdinext.com/',
                transaction_id: this.dataService.getTansactionId(),
                message_id: this.dataService.getUuid(),
                timestamp: this.dataService.getTimestamp(),
            },
            message: {
                order: {
                    provider: {
                        id: providerId,
                    },
                    items: [
                        {
                            id: itemId,
                        },
                    ],
                    fulfillments: [
                        {
                            customer: {
                                person: {
                                    name: data.name,
                                    age: data.age,
                                },
                            },
                            contact: {
                                phone: data.phone,
                                email: data.email,
                            },
                        },
                    ],
                },
            },
        });
    }
}

export class SelectService {}
