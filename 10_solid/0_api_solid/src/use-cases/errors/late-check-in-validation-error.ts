


export class LateCheckInValidationError  extends Error {
    constructor(){
        super(
            'The check-in can only validate unit 20 minutes of its creation.'
        )
    }
}