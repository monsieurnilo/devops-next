"use client"

import {useForm} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { onContactRequest } from "./actions"
import {useState} from "react"
import "./style.css"

const onContactRequestSchema = z.object({
    firstName : z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(2)
})

type FormData = z.infer<typeof onContactRequestSchema>

export default function Contact() {

    const [message, setMessage] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset 
    } = useForm<FormData>({
        resolver: zodResolver(onContactRequestSchema)
    })

    const onSubmit = async (data : FormData) => {
        setMessage("Envoi en cours...")
        try{
            await onContactRequest(data)
            setMessage("Votre message a bien été envoyé")
            reset()
        } catch (error) {
            setMessage("Une erreur est survenue")
        }
        
    }
    return (
        <main className="flex min-h-screen fles-col items-center justify-between p-24">
            <h1>Contactez-nous</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div>
                    <input type="text" placeholder="Nom" {...register("lastName")}/>
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
                <div>
                    <input type="text" placeholder="Prénom" {...register("firstName")}/>
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div>
                    <input type="text" placeholder="Email" {...register("email")}/>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <input type="textarea" placeholder="Message" {...register("message")}/>
                    {errors.message && <p>{errors.message.message}</p>}
                </div>
                {message && <p>{message}</p>}
                <div>
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </main>
    )
}