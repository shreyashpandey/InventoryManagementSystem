import axios from 'axios';
export function apiCalls():Promise<any>
{
    return axios('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory').then((res)=>{return res}).catch((err)=>{
        alert("Apis not working "+err);
    })
}