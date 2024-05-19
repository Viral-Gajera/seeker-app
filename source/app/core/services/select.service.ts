import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class SelectService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPostDetails(providerId: string, itemId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/select`, {
            context: {
                domain: 'onest:learning-experiences',
                action: 'select',
                version: '1.1.0',
                bap_id: 'kahani-bap.tekdinext.com',
                bap_uri: 'https://kahani-bap.tekdinext.com/',
                bpp_id: 'kahani-bpp.tekdinext.com',
                bpp_uri: 'https://kahani-bpp.tekdinext.com/',
                transaction_id: uuidv4(),
                message_id: uuidv4(),
                timestamp: new Date().toISOString(),
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
                },
            },
        });
    }
}
