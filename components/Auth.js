import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Auth.module.css'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithGoogle() {
    try {
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google'
          });
        if (error) throw error
      } catch (error) {
        alert(error.error_description || error.message)
      }
    
  }

  async function signInWithGithub() {
    try {
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'github'
          });
        if (error) throw error
      } catch (error) {
        alert(error.error_description || error.message)
      }
    
  }

  return (
    <> 
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.form_container+' '+styles.sign_in_container}>
                    <form action="#">
                        <h1 className={styles.login_h1}>Sign up/in</h1>
                        <div className={styles.social_container}>
                            <a className={styles.social} onClick={signInWithGoogle}><i className="fab fa-google-plus-g"></i></a>
                            <a className={styles.social} onClick={signInWithGithub}><i className="fab fa-github"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Enter your Email" value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
                        <button onClick={(e) => {e.preventDefault(); handleLogin(email)}} disabled={loading}>
                            <span>{loading ? 'Loading...' : 'Submit'}</span>
                        </button>
                    </form>
                </div>
                <div className={styles.overlay_container}>
                    <div className={styles.overlay}>
                        <div className={styles.overlay_panel+' '+styles.overlay_right}>
                            <img src="/assets/logo.png" className={styles.logo} alt="" />
                            <h1 className={styles.login_h1}>Hello, Friend!</h1>
                            <p>Enter your details and<br/> start your journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}