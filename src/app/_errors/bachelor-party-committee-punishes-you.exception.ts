export class BachelorPartyCommitteePunishesYouException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BachelorPartyCommitteePunishesYouException'
    }
}