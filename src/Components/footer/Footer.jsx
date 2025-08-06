import React from 'react'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';



export default function Footer() {
   
  return (
    <div>
      
      <div className='middle-wrapper'>
        <div className="container">
          <div className="text-center">
            {/* Company Logo/Name */}
            <h2 className="text-2xl text-white font-bold mb-8 tracking-wider">
              HEA & CO.
            </h2>

            {/* Social Media Icons */}
            <div className="d-flex justify-content-center space-x-6 mb-8 gap-2">
              <a 
                href="#" 
                className="social-icon-container"
                aria-label="Facebook"
              >
                <Facebook size={20} color={'#fff'} />
              </a>
              <a 
                href="#" 
                className="social-icon-container"
                aria-label="Twitter"
              >
                {/* <Twitter size={20} color={'#fff'} /> */}
                <i class="bi bi-twitter-x"></i>
              </a>
              <a 
                href="#" 
                className="social-icon-container"
                aria-label="YouTube"
              >
                <Youtube size={20} color={'#fff'} />
              </a>
              <a 
                href="#" 
                className="social-icon-container"
                aria-label="Instagram"
              >
                <Instagram size={20} color={'#fff'} />
              </a>
            </div>
          </div>
            
        </div>
         
      </div>
      <div className="below-wrapper">
          <div className="below-section container bg-black d-flex justify-content-between align-items-center">
          <p className='copy-right text-white footer-texts'>
            © 2025 Hea & Co. - All Rights Reserved
          </p>
          <div>
            <ul className="footer-menu">
              <li className='menu-item'>
                <a href="/" className='footer-texts'>
                      Home
                </a>
              
              </li>
              <li className='menu-item'>
                <a href="/bookService" className='footer-texts'>
                      Book Service
                </a>
              
              </li>
              <li className='menu-item'>
                <a href="#" className='footer-texts'>
                      Privacy policy
                </a>
              
              </li>

              <li className='menu-item'>
                <a href="/contact" className='footer-texts'>
                      Contact us
                </a>
              
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  )
}
