import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import curdService from '../services/config'

function Redirect() {
    const { slug } = useParams()

    useEffect(() => {
        const redirect = async (slug) => {
            const res = await curdService.getRedirectUrl(slug)
            if(res.status == 404) console.log("hello");
            const orignalUrl = await res.data.orignalUrl

            if (orignalUrl) {
                const targetUrl = `https://${orignalUrl}`;
                window.location.replace(targetUrl);
            }

        }
        redirect(slug)

    }, [slug])


    return (
        <div className=' w-full flex justify-center items-center text-white'>Redirecting...</div>
    )
}

export default Redirect