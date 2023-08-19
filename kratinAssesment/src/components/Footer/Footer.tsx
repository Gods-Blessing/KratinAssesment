import './Footer.css'

import { Link } from 'react-router-dom'

// image imports
import insta from '../../assets/icons/instagram.png'
import linked from '../../assets/icons/linkedin.png'
import twitter from '../../assets/icons/twitter.png'
import youtube from '../../assets/icons/youtube.png'



export default function Footer(){

    return (
        <footer>
            {/* address div */}
            <div className='footer-div-1'>
                <h1>Hellper</h1>
                <div>
                    <Link to='/'>
                        <img className="social-icons" src={insta} alt="" />
                    </Link>
                    <Link to=''>
                        <img className="social-icons" src={linked} alt="" />
                    </Link>
                    <Link to=''>
                        <img className="social-icons" src={twitter} alt="" />
                    </Link>
                    <Link to=''>
                        <img className="social-icons" src={youtube} alt="" />
                    </Link>

                </div>
            </div>

            {/* footer div 2 */}
            <div className="footer-div-2">
                <div className='address'>
                    <h2>Be in Touch</h2>
                    <h2>Address</h2>
                    <p>Hellper Group, building no. 25,</p>
                    <p>PO: Govindpuri, London, E414</p>
                    <p>+555555555</p>
                    <p>info.helper@help.com</p>
                </div>

                <div className='links-for-pages'>
                    <ul>
                        <h3>Work with us</h3>
                        <li>Vacancies</li>
                        <li>Apply</li>
                        <li>Careers</li>
                    </ul>
                    <ul>
                        <h3>Quick Links</h3>
                        <li>Our values</li>
                        <li>Join the Hellper</li>
                        <li>Become a Sponsor</li>
                    </ul>
                </div>

            </div>

            {/* other links div as well */}
            <div className='other-links'>
                <p>Sitemap</p>
                <p>Privacy & Cookies</p>
                <p>Terms and Conditions</p>
                <p>Accessibility policy</p>
            </div>
        </footer>
    )
} 