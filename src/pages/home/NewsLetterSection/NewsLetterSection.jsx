import React, { useState } from 'react';
import './NewsLetterSection.scss';

import SmallTextButton from '../../../components/common/Buttons/SmallTextButton/SmallTextButton';

function NewsLetterSection() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    if (email) {
      setSuccess(true);
    }
  };

  return (
    <div className="container">
      <div className="news-letter-section">
        <div className="row">
          <div className="col-md-7 text-white text-bold">
            <span className="text-small">NEWSLETTER</span>
            <br />
            <span className="text-medium">Sign up for newsletter and get latest news and update</span>
          </div>
          <div className="col-md-5 bg-white rounded d-flex align-items-center">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="news_letter" placeholder="Enter Your Email" className="news-letter-email text-small" />
            <SmallTextButton handleClick={handleClick} text="Subscribe" classes="px-4" />
          </div>
          {(success) && <strong style={{ color: 'limegreen' }}>Thank you for subscribing to our mailing list.</strong> }
        </div>
      </div>
    </div>
  );
}

export default NewsLetterSection;
