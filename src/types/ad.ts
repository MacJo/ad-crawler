export interface ADOptions{
            url: string,
            baseDN: string, //'dc=' + process.env.ad_domain + ',dc=' + process.env.ad_domainsuf
            username: string ,
            password: string
}