import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import dynamic from "next/dynamic";
import { supabase } from '../utils/supabaseClient'

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

function Navbar() {

    const [profile, setProfile] = useState(null)
    const router = useRouter()

    const [click, setclick] = useState(false);

    const handleClick = () => setclick(!click);
    const closeMenu = () => setclick(false);

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        try {
            const profileData = await supabase.auth.user()

            if (!profileData) {
                router.push('/')
            } 
            else{
                setProfile(profileData)
            }

        } catch (error) {
            alert(error.message)
            router.push('/')
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        document.cookie = "Event=;";
        document.cookie = "Session=;";
        router.reload(window.location.pathname)
    }

    async function checkUser() {
        /* when the component loads, checks user to show or hide Sign In link */
        const user = await supabase.auth.user()
        if (user) {
            console.log(user)
            router.reload(window.location.pathname)
        }
        else{
            router.push('/')
        }
      }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar_container}>
                        <div className={styles.navbar_logo}>
                            {/* <img src="/vercel.svg" className={styles.logo} alt=""/> */}
                            <p className={styles.navbar_logo_name}>Drawy</p>
                        </div>
                    
                    <ul className={click? styles.nav_menu_hidden+" "+styles.active : styles.nav_menu_hidden}>
                        <li className={styles.nav_item} onClick={closeMenu}>
                            <a href="https://utkarsh-portfolio.web.app/" target="blank" className={styles.nav_links} >Dev-Portfolio</a>
                        </li>
                        <li className={styles.nav_item} onClick={closeMenu}>
                            <Link href='mailto:utkarsh.singh27800@gmail.com' className={styles.nav_links} >Contact-Me</Link>
                        </li>
                    </ul>

                    <ul className={styles.nav_menu}>
                        <li className={styles.nav_item}>
                            {profile?
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <img style={{width:'30px',marginRight:'10px',borderRadius:'50%'}} 
                                        src={"https://avatars.dicebear.com/api/initials/"+profile.email+".svg"}>
                                    </img>
                                    {/* <p style={{fontSize:'1em'}}>{profile.email}</p> */}
                                </div>
                                :
                                ''
                            }
                        </li>
                        <li className={styles.nav_item}>
                            {profile?
                                <div className={styles.nav_links} onClick={signOut}>SIGNOUT</div>
                                :
                                <div className={styles.nav_links} onClick={checkUser}>LOGIN</div>
                            }
                        </li>
                        <li>
                            <ThemeToggle/>
                        </li>
                    </ul>
                    <div className={styles.menu_icon} onClick={handleClick}>
                        <i className={click? "fas fa-times" : "fa fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
