import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import Board from '../components/Board'

import styles from '../styles/Home.module.css'

function Account() {
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        try {
            const profileData = await supabase.auth.user()

            if (!profileData) {
                router.push('/')
            } else {
                setProfile(profileData)   
                console.log(profileData)
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

    if (!profile) return null
    return (
        <>
            <Head>
                <title>Drawy</title>
                <meta name="description" content="Created by Utkarsh Singh" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar/>
            <div className={styles.board_conatiner}>
                <Board className={styles.board}/>
                <div className={styles.overlay}>Mobile not yet supported</div>
            </div>
        </>
    )
}

export default Account
