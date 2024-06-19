import React, { useCallback, useRef, useState } from 'react'
import Container from './container/Container'
import { Button, Input } from "../components/index.js"
import { useForm } from "react-hook-form"
import curdService from "../services/config.js"

function Home() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [shortedUrl, setShortedUrl] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef(null)

    const ShortURL = async (data) => {
        const res = await curdService.createShortUrl(data)
        console.log("res", res);
        if (res?.statusCode >= 400) {
            console.log("failed to short");
        } else {
            setShortedUrl(`http://localhost:5173/redirect/${res.data.shortId}`);
        }
    }

    const copyUrltoClipboard = useCallback(() => {
        inputRef.current?.select();
        window.navigator.clipboard.writeText(shortedUrl)
    })

    console.log(shortedUrl);
    return (
        <Container>

            <div className=' text-white flex flex-col items-center justify-center' >
                <h1 className='  text-5xl font-bold' > Short URL</h1>

                {shortedUrl ? (
                    <div className=' mt-[50px] flex flex-col items-center justify-center w-[650px] h-[220px] shadow-2xl bg-zinc-700' >

                        {/* <h1 className=' text-4xl font-bold' >Paste the URL to be shortened</h1> */}

                        <div className=' mt-4 w-3/4 flex items-center justify-center'>
                            <Input ref={inputRef} type="text" readOnly value={shortedUrl} className="rounded-none h-[40px]" />
                            <Button
                                onClick={copyUrltoClipboard}
                                // type='submit'
                                className='w-[200px] h-[40px] rounded-none'
                            >
                                copy
                            </Button>
                        </div>

                        <div className='mt-5 mr-14 flex  '>
                            <p>Long URL: </p> <a href={shortedUrl} className='text-blue-500 ml-2' > {shortedUrl}</a>
                        </div>

                    </div>
                )


                    : (<div className='mt-[20px] flex flex-col items-center justify-center w-[650px] h-[220px] shadow-2xl bg-zinc-700' >

                        <h1 className=' text-4xl font-bold' >Paste the URL to be shortened</h1>


                        <form onSubmit={handleSubmit(ShortURL)} className=' mt-4 w-3/4 flex items-center justify-center ' >


                            <Input {...register("redirectURL", { required: true })} className="rounded-none h-[40px]" />
                            <Button
                                type='submit'
                                className='w-[200px] h-[40px] rounded-none'
                            >
                                Shorten URL
                            </Button>
                        </form>
                        {errors.redirectURL && (<p className=' mr-24 text-red-500'>orignal url is required</p>)}



                        {shortedUrl ? ((
                            <div className='mt-5 mr-14 flex  '>
                                <p>Short URL: </p> <a href={shortedUrl} className='text-blue-500 ml-2' > {shortedUrl}</a>
                            </div>
                        ))
                            : (<p className=' m-5 w-[500px]'>ShortURL is a free tool to shorten URLs and generate short links
                                URL shortener allows to create a shortened link making it easy to share</p>)}



                    </div>)}


            </div>
        </Container >
    )
}

export default Home