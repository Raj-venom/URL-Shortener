import React from 'react'
import { Link } from "react-router-dom"
import { Button, Input } from "./index"

function Signup() {
    return (
        <div className=' flex flex-col text-center px-8 py-5 w-[380px] h-[520px] bg-zinc-100 rounded-lg '>
            <div className='Heading my-5'>
                <h1 className=' text-zinc-900 text-3xl font-semibold'>Sign Up</h1>
            </div>

            <form >
                <div className='space-y-3'>
                    <Input placeholder="FullName" />
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
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