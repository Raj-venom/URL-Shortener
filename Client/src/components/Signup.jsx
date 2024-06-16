import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "./index"
import { useForm } from "react-hook-form"
import authService from '../services/auth'

function Signup() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const signup = async (data) => {
        setError("")

        try {
            const response = await authService.createAccount(data)

            if (response) {
                navigate("/")
            }

        } catch (error) {

            if (typeof (error?.response?.data?.message) === "string") {
                setError(error?.response?.data?.message)
            } else {
                setError("invalid email or use strong password")
            }
        }

    }

    return (
        <div className=' flex flex-col text-center px-8 py-5 w-[380px] h-[520px] bg-zinc-100 rounded-lg '>
            <div className='Heading my-5'>
                <h1 className=' text-zinc-900 text-3xl font-semibold'>Sign Up</h1>
            </div>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(signup)} >
                <div className='space-y-3'>
                    <Input
                        placeholder="FullName"
                        {...register("fullName")}
                    />

                    <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                </div>

                <Button
                    type='submit'
                    className='w-full mt-2'
                >
                    Sign up</Button>


            </form>


            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Login
                </Link>
            </p>




        </div>
    )
}

export default Signup