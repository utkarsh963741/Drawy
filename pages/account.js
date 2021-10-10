import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import Link from 'next/link'

function Account() {
    const [profile, setProfile] = useState(null)
    const [imageData, setImageData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchProfile()
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchProfile() {
        try {
            const profileData = await supabase.auth.user()

            if (!profileData) {
                router.push('/')
            } else {
                // console.log(profileData)
                setProfile(profileData)   
            }

        } catch (error) {
            alert(error.message)
            router.push('/')
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/')
    }

    async function fetchData() {
        try {
            const { data, error } = await supabase
            .from('Images')
            .select()

            if(data)
            {
                console.log(data)
                setImageData(data)
            }

        } catch (error) {
            alert(error.message)
            router.push('/')
        }
    }

    if(imageData)
    {
        var ImageGrid = [...imageData].map(function(img_data, index){
            return(
                <div key={index} class={styles.card}>
                    <img src={img_data.image} alt="Avatar" width="100%" height="200px"/>
                    <hr></hr>
                    <div class={styles.desc}>
                        <h4><b>{img_data.owner}</b></h4> 
                        <p>{img_data.topic}</p>
                        <p>Date : {img_data.created_at.slice(0, 16)}</p>
                    </div>
                </div>
        );
        })
    }

    if (!profile) return null
    return (
        <>
            <Head>
                <title>Drawy</title>
                <meta name="description" content="Created by Utkarsh Singh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar/>
            <div className={styles.container}>
                <div></div>
                <Link href='/draw'><h1 className={styles.title}>Start Drawing</h1></Link>
                <div className={styles.images}>{ImageGrid}</div>
            </div>
        </>
    )
}

export default Account
