import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "./index"
import authService from '../services/auth'
import { useForm } from "react-hook-form"

function Login() {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const login = async (data) => {

        try {
            const session = await authService.login(data)
            if (session) {
                // const userData = await 
                console.log(session);
                // navigate("/")
            }else{
                console.log("no sesssion");
            }
            console.log(data);
        } catch (error) {

        }
    }

    return (
        <div className=' flex flex-col text-center px-8 py-5 w-[380px] h-[520px] bg-zinc-100 rounded-lg '>
            <div className='Heading my-5'>
                <h1 className=' text-zinc-900 text-3xl font-semibold'>Login</h1>
            </div>

            {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

            <form onSubmit={handleSubmit(login)} >
                <div className='space-y-3'>
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
                    Login</Button>


            </form>


            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>




        </div>
    )
}

export default Login