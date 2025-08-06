import React, { useState } from 'react'
import footerImage from '../../assets/imgs/footer-img.webp'

function UpperFooterPart() {
    const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email.trim() && email.includes('@')) {
      console.log('Email submitted:', email);
     
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };
  return (
    <div className='the-upper-container container'>
        <div className='inner-wrapper row'
        > <div className='col-md-5'>
            <img className='footer-photo' src={footerImage} alt='footer image' />
          </div>
          
          <div className='col-md-7 d-flex gap-3 flex-column align-items-left justify-content-center p-4'>
            <h1 className='left-header text-white'>Tips, Deals & Drops,
              <br/>Just for You</h1>
            <p className='text-white'>Subscribe for exclusive product picks, grooming guides, and salon deals.</p>
           
              <div className="flex flex-col sm:flex-row gap-4 max-w-100 lg:mx-0 p-2">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  >
                    Subscribe
                  </button>
                </div>
            
          </div>
        </div>
        

      </div>
  )
}

export default UpperFooterPart
