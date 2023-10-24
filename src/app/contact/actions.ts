"use server"

type ContactRequest = {
    firstName: string,
    lastName: string,
    email: string,
    message: string
}

async function onContactRequest({ firstName, lastName, email, message }: ContactRequest) {
    console.log('Server side', { firstName, lastName, email, message })
}

export {
    onContactRequest
}