import ActiveDirectory from 'activedirectory2'
import { writeFile } from 'fs'
import { ADOptions } from './types/ad';

export class ADcrawler {

    getUsersfromGroup(global_group: string, config: ADOptions,  client: string): void {
        let ad = new ActiveDirectory(config);

        ad.getUsersForGroup(global_group, function (err: any, users: any) {
            let usersngroups: any = [];

            if (err) {
                throw new Error(err)
            } else if (users) {
                users.forEach((user: any, index: number, number: any) => {
                    ad.getGroupMembershipForUser(user.userPrincipalName, function (err: any, groups: any) {
                            if (err) throw new Error(err)
                            if (groups) {
                                user = Object.assign(user, { groups: groups })
                                usersngroups.push(user)

                                if (usersngroups.length === number.length) {
                                    writeFile('export/ad/usersfrom' + client + '.json', JSON.stringify(usersngroups), (err: any) => {
                                        if (err) throw new Error(err)
                                    });
                                }
                            }
                    })
                });
            }
        });
    }
}