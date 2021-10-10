import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

import Auth from '../components/Auth'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session)
      if(session)
      {
        setSession(session)
        router.push('/account')
      }
    })
  }, [])

  useEffect(() => {
      fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
        const profileData = await supabase.auth.user()

        if (profileData) {
            router.push('/account')
        }

    } catch (error) {
        alert(error.message)
        router.push('/')
    }
  }

  return (
    <div>
      <Head>
        <title>Drawy</title>
        <meta name="description" content="Created by Utkarsh Singh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <Auth />
      </main>

    </div>
  )
}
